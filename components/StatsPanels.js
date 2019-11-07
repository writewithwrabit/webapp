import { usePreloadedQuery } from 'react-relay/hooks';
import { useStoreState } from 'easy-peasy';

import GetStats from '../queries/GetStats';

import WordsWrittenPanel from './WordsWrittenPanel';
import LongstStreakPanel from './LongestStreakPanel';
import PreferredWritingTimePanel from './PreferredWritingTimePanel';
import PreferredDayOfWeekPanel from './PreferredDayOfWeekPanel';
import LongestEntryPanel from './LongestEntryPanel';

const StatsPanels = ({ statsPreloadedQuery }) => {
  const { '/stats': preloadedQuery } = useStoreState(state => state.pages.preloadedQueries);
  const { stats } = usePreloadedQuery(GetStats, statsPreloadedQuery || preloadedQuery);

  const { wordsWritten, longestStreak, longestEntry, preferredDayOfWeek, preferredWritingTimes } = stats;

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
