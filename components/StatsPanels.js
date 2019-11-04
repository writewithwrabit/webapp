import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import WordsWrittenPanel from './WordsWrittenPanel';
import LongstStreakPanel from './LongestStreakPanel';
import PreferredWritingTimePanel from './PreferredWritingTimePanel';
import PreferredDayOfWeekPanel from './PreferredDayOfWeekPanel';
import LongestEntryPanel from './LongestEntryPanel';

const GET_STATS = graphql`
  query StatsPanelsQuery($global: Boolean!) {
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

const StatsPanels = ({ selected }) => {
  const { stats } = useLazyLoadQuery(GET_STATS, {
    global: selected === 'community',
  });

  const {wordsWritten, longestStreak, longestEntry, preferredDayOfWeek, preferredWritingTimes} = stats;

  return (
    <div className="flex flex-wrap">
      <WordsWrittenPanel wordsWritten={wordsWritten} />

      <LongstStreakPanel longestStreak={longestStreak} />

      <PreferredWritingTimePanel preferredWritingTimes={preferredWritingTimes} />

      <PreferredDayOfWeekPanel preferredDayOfWeek={preferredDayOfWeek} />

      <LongestEntryPanel longestEntry={longestEntry} />
    </div>
  );
}

export default StatsPanels;
