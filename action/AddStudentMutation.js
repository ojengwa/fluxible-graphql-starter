import {commitMutation, graphql} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';

const mutation = graphql`
  mutation AddStudentMutation($input: AddStudentInput!) {
    addStudent(input: $input) {
      studentEdge {
        __typename
        cursor
        node {
          id
          firstName
          lastName
          birthday
          photo
          hobbies
        }
      }
      viewer {
        id
        totalCount
      }
    }
  }
`;

function sharedUpdater(store, user, newEdge) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'StudentList_students');
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
}

let tempID = 0;

function commit(environment, params, user) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        params,
        clientMutationId: String(tempID++),
      },
    },
    updater: store => {
      const payload = store.getRootField('addStudent');
      const newEdge = payload.getLinkedRecord('studentEdge');
      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: store => {
      const id = 'client:newStudent:' + tempID++;
      const node = store.create(id, 'Student');
      node.setValue(firstName, 'firstName');
      node.setValue(lastName, 'lastName');
      node.setValue(birthday, 'birthday');
      node.setValue(photo, 'photo');
      node.setValue(hobbies, 'hobbies');
      node.setValue(id, 'id');
      const newEdge = store.create('client:newEdge:' + tempID++, 'StudentEdge');
      newEdge.setLinkedRecord(node, 'node');
      sharedUpdater(store, user, newEdge);
      const userProxy = store.get(user.id);
      userProxy.setValue(userProxy.getValue('totalCount') + 1, 'totalCount');
    },
  });
}

export default {commit};
