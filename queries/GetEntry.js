import { graphql } from 'relay-runtime';

const GetEntry = graphql`
  query GetEntryQuery($userID: ID!, $date: String!) {
    dailyEntry(userID: $userID, date: $date) {
      id
      content
      wordCount
      createdAt
      goalHit
    }
  }
`;

export default GetEntry;