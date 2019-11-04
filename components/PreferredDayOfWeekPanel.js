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

const PreferredDayOfWeekPanel = ({ preferredDayOfWeek }) => {
  const data = (
    <div className="flex flex-col">
      <span className="text-5xl">🗓️</span>
      <span>{daysOfTheWeek[preferredDayOfWeek]}</span>
    </div>
  );

  return (
    <StatsPanel text="preferred day of the week" data={data} />
  );
}

export default PreferredDayOfWeekPanel;
