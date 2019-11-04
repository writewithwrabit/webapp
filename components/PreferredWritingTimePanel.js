import StatsPanel from './StatsPanel';

const timezoneOffsetHours = new Date().getTimezoneOffset() / 60;

const transformWritingTimesToLocal = writingTimes => writingTimes.map(({hour, count}) => {
  const localHour = hour - timezoneOffsetHours;
  return {
    hour: Math.sign(localHour) === -1 ? 24 + localHour : localHour,
    count,
  };
});

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

  return 'not enough data';
}

const PreferredWritingTimePanel = ({ preferredWritingTimes }) => {
  const localPreferredWritingTimes = transformWritingTimesToLocal(preferredWritingTimes);
  const preferredWritingTimeOfDay = findTimeOfDay(localPreferredWritingTimes[0]);

  return (
    <StatsPanel text="preferred writing time" data={preferredWritingTimeOfDay} />
  );
}

export default PreferredWritingTimePanel;
