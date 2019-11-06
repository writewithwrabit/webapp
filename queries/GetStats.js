import { graphql } from 'react-relay/hooks';

const GET_STATS = graphql`
  query GetStatsQuery($global: Boolean!) {
    stats(global: $global) {
      wordsWritten
      longestEntry
      longestStreak
      preferredDayOfWeek
      preferredWritingTimes {
        hour
        count
      }
    }
  }
`;

export default GET_STATS;