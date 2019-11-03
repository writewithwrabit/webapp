import numeral from 'numeral';

import StatsPanel from './StatsPanel';

const timezoneOffsetHours = new Date().getTimezoneOffset() / 60;

const daysOfTheWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const findTimeOfDay = ({ hour }) => {
  if (hour >= 6 && hour < 12) {
    return (
      <div className="flex flex-col">
        <span className="text-5xl">🌅</span>
        <span>Morning</span>
      </div>
    );
  }

  if (hour >= 12 && hour < 17) {
    return (
      <div className="flex flex-col">
        <span className="text-5xl">🏙</span>
        <span>Afternoon</span>
      </div>
    );
  }

  if (hour >= 17 && hour < 20) {
    return (
      <div className="flex flex-col">
        <span className="text-5xl">🌃</span>
        <span>Evening</span>
      </div>
    );
  }
  
  if (hour >= 20 && hour < 6) {
    return (
      <div className="flex flex-col">
        <span className="text-5xl">🌌</span>
        <span>Night</span>
      </div>
    );
  }

  return 'unknown';
}

const transformWritingTimesToLocal = writingTimes => writingTimes.map(({hour, count}) => {
  const localHour = hour - timezoneOffsetHours;
  return {
    hour: Math.sign(localHour) === -1 ? 24 + localHour : localHour,
    count,
  };
});

const StatsPanels = ({data, loading, error}) => {
  if (loading) return (<div>LOADING</div>);
  if (error) return (<div>ERROR</div>);

  const {wordsWritten, longestStreak, longestEntry, preferredDayOfWeek, preferredWritingTimes} = data.stats;

  const localPreferredWritingTimes = transformWritingTimesToLocal(preferredWritingTimes);
  const preferredWritingTimeOfDay = findTimeOfDay(localPreferredWritingTimes[0]);

  const formattedWordsWritten = wordsWritten > 10000
    ? numeral(wordsWritten).format('0.0a')
    : wordsWritten;

  const formattedLongestEntry = longestEntry > 10000
    ? numeral(longestEntry).format('0.0a')
    : longestEntry;

  return (
    <div className="flex flex-wrap">
      <StatsPanel text="words written" data={formattedWordsWritten} />

      {/* <StatsPanel text="amount donated" data={data.stats.amountDonated} /> */}

      <StatsPanel text="longest streak" data={longestStreak || 0} />

      <StatsPanel text="preferred writing time" data={preferredWritingTimeOfDay} />

      <StatsPanel text="preferred day of the week" data={daysOfTheWeek[preferredDayOfWeek] || 'unknown'} />

      <StatsPanel text="longest entry" data={formattedLongestEntry || 0} />
    </div>
  );
}

export default StatsPanels;
