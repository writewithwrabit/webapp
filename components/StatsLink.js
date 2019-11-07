import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { preloadQuery } from 'react-relay/hooks';
import { useStoreActions } from 'easy-peasy';

import GET_STATS from '../queries/GetStats';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';
const environment = createRelayEnvironment();

const StatsLink = () => {
  const router = useRouter();
  const setPreloadedQuery = useStoreActions(actions => actions.pages.setPreloadedQuery);

  const preloadCode = () => {
    router.prefetch('/stats');
  }

  const preloadRoute = () => {
    router.prefetch('/stats');

    const preloadedQuery = preloadQuery(
      environment,
      GET_STATS,
      { global: false },
    );

    setPreloadedQuery({ preloadedQuery });
  };

  return (
    <a
      onClick={() => setTimeout(() => router.push('/stats'), 100)}
      onMouseDown={preloadRoute}
      onMouseEnter={preloadCode}
    >
      Stats
    </a>
  )
}

export default StatsLink;
