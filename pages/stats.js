import withLayout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const Stats = () => {
  const subtitle = 'Find patterns and encouragement in all the pretty graphs and numbers.';

  return (
    <div>
      <PageHeader title="Stats" subtitle={subtitle} />
    </div>
  );
}

export default withLayout(Stats);
