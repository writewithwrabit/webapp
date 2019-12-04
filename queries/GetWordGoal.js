import { graphql } from 'react-relay/hooks';

const GetWordGoal = graphql`
  query GetWordGoalQuery($userID: ID!) {
    wordGoal(userID: $userID)
  }
`;

export default GetWordGoal;
