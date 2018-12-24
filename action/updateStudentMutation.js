import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RenameStudentMutation($input: RenameStudentInput!) {
    updateStudent(input: $input) {
      student {
        id
        firstName
        lastName
        birthday
        photo
        hobbies
      }
    }
  }
`;

function getOptimisticResponse(params, student) {
  return {
    updateStudent: {
      student: {
        id: student.id,
        params: params,
      },
    },
  };
}

function commit(environment, params, student) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {params, id: student.id},
    },
    optimisticResponse: getOptimisticResponse(params, student),
  });
}

export default {commit};
