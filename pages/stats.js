import withLayout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import StatsSelector from '../components/StatsSelector';
import StatsWidget from '../components/StatsWidget';

const Stats = () => {
  const subtitle = 'Find patterns and encouragement in all the pretty graphs and numbers.';

  return (
    <div>
      <PageHeader title="Stats" subtitle={subtitle} />

      <StatsSelector />

      <div className="flex flex-wrap">
        <StatsWidget text="words written" data={200} />

        {/* <StatsWidget text="amount donated" data={5000} /> */}

        <StatsWidget text="longest streak" data={7} />

        <StatsWidget text="preferred writing time" data={"morning"} />

        <StatsWidget text="favourite day of the week" data={"Monday"} />

        <StatsWidget text="longest entry" data={2000} />
      </div>
    </div>
  );
}

export default withLayout(Stats);
