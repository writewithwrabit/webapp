import { QueryRenderer } from 'react-relay';

import createRelayEnvironment from '../lib/createRelayEnvironment';
const environment = createRelayEnvironment();

import GetStats from '../queries/GetStats';

import WordsWrittenPanel from './WordsWrittenPanel';
import LongstStreakPanel from './LongestStreakPanel';
import PreferredWritingTimePanel from './PreferredWritingTimePanel';
import PreferredDayOfWeekPanel from './PreferredDayOfWeekPanel';
import LongestEntryPanel from './LongestEntryPanel';
import StatsPanelsFallback from './StatsPanelsFallback';

const StatsPanels = ({ selected }) => {
  const renderStats = ({ error, props }) => {
    if (error) {
      throw Error(error);
    } else if (props) {
      const { wordsWritten, longestStreak, longestEntry, preferredDayOfWeek, preferredWritingTimes } = props.stats;
      const hasWritten = longestEntry > 0;
    
      return (
        <div className="flex flex-wrap">
          <WordsWrittenPanel wordsWritten={wordsWritten} />
    
          <LongstStreakPanel longestStreak={longestStreak} />
    
          <PreferredWritingTimePanel preferredWritingTimes={preferredWritingTimes} hasWritten={hasWritten} />
    
          <PreferredDayOfWeekPanel preferredDayOfWeek={preferredDayOfWeek} hasWritten={hasWritten} />
    
          <LongestEntryPanel longestEntry={longestEntry} />
        </div>
      );
    }
  
    return <StatsPanelsFallback />;
  }

  return (
    <QueryRenderer
      environment={environment}
      query={GetStats}
      variables={{
        global: selected === 'community',
      }}
      render={renderStats}
    />
  );
}

export default StatsPanels;
