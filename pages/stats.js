import { useState, Suspense } from 'react';

import withLayout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import StatsSelector from '../components/StatsSelector';
import StatsPanels from '../components/StatsPanels';

const Stats = () => {
  const subtitle = 'Find patterns and encouragement in all the pretty graphs and numbers.';
  const [selected, setSelected] = useState('me');
  
  return (
    <div>
      <PageHeader title="Stats" subtitle={subtitle} />

      <StatsSelector selected={selected} setSelected={setSelected} />

      <Suspense fallback={<div>Loading...</div>}>
        <StatsPanels selected={selected} />
      </Suspense>
    </div>
  );
}

export default withLayout(Stats);
