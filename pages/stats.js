import {useState, useEffect} from 'react';
import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';

import withLayout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import StatsSelector from '../components/StatsSelector';
import StatsPanels from '../components/StatsPanels';

const GET_STATS = gql`
  query stats($global: Boolean!) {
    stats(global: $global) {
      wordsWritten
      longestEntry
      longestStreak
      preferredDayOfWeek
      preferredWritingTimes {
        hour
        count
      }
    }
  }
`;

const Stats = () => {
  const subtitle = 'Find patterns and encouragement in all the pretty graphs and numbers.';
  const [selected, setSelected] = useState('me');
  const { loading, error, data } = useQuery(GET_STATS, {
    variables: {
      global: selected === 'community',
    },
  });

  return (
    <div>
      <PageHeader title="Stats" subtitle={subtitle} />

      <StatsSelector selected={selected} setSelected={setSelected} />

      <StatsPanels data={data} loading={loading} error={error} />
    </div>
  );
}

export default withLayout(Stats);
