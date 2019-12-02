import StatsPanel from './StatsPanel';

const daysOfTheWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const PreferredDayOfWeekPanel = ({ preferredDayOfWeek, hasWritten }) => {
  const displayText = hasWritten ? daysOfTheWeek[preferredDayOfWeek] : 'no entries found';

  const data = (
    <div className="flex flex-col">
      <span className="text-5xl">🗓️</span>
      <span>{displayText}</span>
    </div>
  );

  return (
    <StatsPanel text="preferred day of the week" data={data} />
  );
}

export default PreferredDayOfWeekPanel;
