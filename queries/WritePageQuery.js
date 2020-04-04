import { graphql } from 'relay-runtime';

const WritePageQuery = graphql`
  query WritePageQuery($userID: ID!, $date: String!) {
    dailyEntry(userID: $userID, date: $date) {
      id
      content
      wordCount
      createdAt
      goalHit
    }
    wordGoal(userID: $userID, date: $date)
  }
`;

export default WritePageQuery;
