import {commitMutation, graphql} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';

const mutation = graphql`
  mutation RemoveStudentMutation($input: RemoveStudentInput!) {
    removeStudent(input: $input) {
      deletedStudentId
      viewer {
        completedCount
        totalCount
      }
    }
  }
`;

function sharedUpdater(store, user, deletedID) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'StudentList_students');
  ConnectionHandler.deleteNode(conn, deletedID);
}

function commit(environment, student, user) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {id: student.id},
    },
    updater: store => {
      const payload = store.getRootField('removeStudent');
      sharedUpdater(store, user, payload.getValue('deletedStudentId'));
    },
    optimisticUpdater: store => {
      sharedUpdater(store, user, student.id);
    },
  });
}

export default {commit};
