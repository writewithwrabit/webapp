import StatsPanel from './StatsPanel';

const StatsPanels = ({data, loading, error}) => {
  if (loading) return (<div>LOADING</div>);
  if (error) return (<div>ERROR</div>);

  return (
    <div className="flex flex-wrap">
      <StatsPanel text="words written" data={data.stats.wordsWritten || 0} />

      {/* <StatsPanel text="amount donated" data={data.stats.amountDonated} /> */}

      <StatsPanel text="longest streak" data={data.stats.longestStreak || 0} />

      {/* <StatsPanel text="preferred writing time" data={preferredWritingTime} /> */}

      <StatsPanel text="preferred day of the week" data={data.stats.preferredDayOfWeek || 0} />

      <StatsPanel text="longest entry" data={data.stats.longestEntry || 0} />
    </div>
  );
}

export default StatsPanels;
