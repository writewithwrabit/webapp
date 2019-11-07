import { graphql } from 'react-relay/hooks';

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
