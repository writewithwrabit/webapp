import StatsPanel from './StatsPanel';

const LongestStreakPanel = ({ longestStreak }) => {
  const data = (
    <div className="flex flex-col">
      <span className="text-5xl">⚡</span>
      <span>{longestStreak}</span>
    </div>
  );

  return (
    <StatsPanel text="longest streak" data={data} />
  );
}

export default LongestStreakPanel;
