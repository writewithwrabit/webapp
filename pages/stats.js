import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

import GET_STATS from '../queries/GetStats';

import withLayout from '../components/Layout';
import withPreloadedQuery from '../components/PreloadedQuery';
import PageHeader from '../components/PageHeader';
import StatsSelector from '../components/StatsSelector';
const StatsPanels = dynamic(
  () => import('../components/StatsPanels'),
  { ssr: false }
);

const Stats = () => {
  const subtitle = 'Find patterns and encouragement in all the pretty graphs and numbers.';
  const [selected, setSelected] = useState('me');
  const [preloadedQuery, setPreloadedQuery] = useState(null);
  
  return (
    <div>
      <PageHeader title="Stats" subtitle={subtitle} />

      <StatsSelector selected={selected} setSelected={({ selected, preloadedQuery }) => {
        setSelected(selected);
        setPreloadedQuery(preloadedQuery);
      }} />

      <Suspense fallback={<div>Loading...</div>}>
        <StatsPanels selected={selected} statsPreloadedQuery={preloadedQuery} />
      </Suspense>
    </div>
  );
}

export default withLayout(
  withPreloadedQuery(Stats, {
    key: '/stats',
    query: GET_STATS,
    variables: {
      global: false,
    }
  }),
);
