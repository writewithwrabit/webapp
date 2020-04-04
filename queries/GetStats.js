import { graphql } from 'relay-runtime';

const GetStats = graphql`
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

export default GetStats;