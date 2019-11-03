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

  const preferredWritingTimes = transformWritingTimesToLocal(data.stats.preferredWritingTimes);
  const preferredWritingTimeOfDay = findTimeOfDay(preferredWritingTimes[0]);

  return (
    <div className="flex flex-wrap">
      <StatsPanel text="words written" data={data.stats.wordsWritten || 0} />

      {/* <StatsPanel text="amount donated" data={data.stats.amountDonated} /> */}

      <StatsPanel text="longest streak" data={data.stats.longestStreak || 0} />

      <StatsPanel text="preferred writing time" data={preferredWritingTimeOfDay} />

      <StatsPanel text="preferred day of the week" data={daysOfTheWeek[data.stats.preferredDayOfWeek] || 'unknown'} />

      <StatsPanel text="longest entry" data={data.stats.longestEntry || 0} />
    </div>
  );
}

export default StatsPanels;
