import { graphql } from 'react-relay/hooks';

const GetUser = graphql`
  query GetUserQuery($firebaseID: String) {
    userByFirebaseID(firebaseID: $firebaseID) {
      firstName
      lastName
      email
      wordGoal
    }
  }
`;

export default GetUser;
