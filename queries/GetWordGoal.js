import { graphql } from 'relay-runtime';

const GetWordGoal = graphql`
  query GetWordGoalQuery($userID: ID!, $date: String!) {
    wordGoal(userID: $userID, date: $date)
  }
`;

export default GetWordGoal;
