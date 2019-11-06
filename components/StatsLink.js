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
    console.log('code, code, code');
    // router.prefetch('/stats');
  }

  const preloadRoute = () => {
    console.log('all, all, all');
    // router.prefetch('/stats');

    const preloadedQuery = preloadQuery(
      environment,
      GET_STATS,
      { global: false },
    );
    console.log(preloadQuery);
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
