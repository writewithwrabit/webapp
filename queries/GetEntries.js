import { graphql } from 'relay-runtime';

const GetEntries = graphql`
  query GetEntriesQuery($userID: ID!, $startDate: String, $endDate: String) {
    entriesByUserID(userID: $userID, startDate: $startDate, endDate: $endDate) {
      id
      wordCount
      createdAt
      content
      goalHit
    }
  }
`;

export default GetEntries;
