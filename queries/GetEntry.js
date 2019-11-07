import { graphql } from 'react-relay/hooks';

const GetEntry = graphql`
  query GetEntryQuery($userID: ID!, $date: String!) {
    dailyEntry(userID: $userID, date: $date) {
      id
      content
      wordCount
      createdAt
    }
  }
`;

export default GetEntry;