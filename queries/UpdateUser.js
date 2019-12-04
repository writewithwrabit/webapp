import { graphql } from 'react-relay/hooks';

const UpdateUser = graphql`
  mutation UpdateUserMutation($input: UpdatedUser!) {
    updateUser(input: $input) {
      id
      firebaseID
      stripeID
      firstName
      lastName
      email
      wordGoal
    }
  }
`;

export default UpdateUser;
