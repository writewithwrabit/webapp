import { useStoreActions } from 'easy-peasy';
import { preloadQuery } from 'react-relay/hooks';

import createRelayEnvironment from '../lib/relay/createRelayEnvironment';
const environment = createRelayEnvironment();

const withPreloadedQuery = (Component, { query, variables }) => {
  return () => {
    const setPreloadedQuery = useStoreActions(actions => actions.pages.setPreloadedQuery);

    const preloadedQuery = preloadQuery(
      environment,
      query,
      variables,
    );

    setPreloadedQuery({ preloadedQuery });

    return <Component />;
  }
}

export default withPreloadedQuery;
