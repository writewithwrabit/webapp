import { graphql } from 'react-relay/hooks';

const GetWordGoal = graphql`
  query GetWordGoalQuery($userID: ID!, $date: String!) {
    wordGoal(userID: $userID, date: $date)
  }
`;

export default GetWordGoal;
