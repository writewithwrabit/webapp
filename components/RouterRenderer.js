import { useRouter } from 'next/router';
import { useStoreActions } from 'easy-peasy';
import { preloadQuery } from 'react-relay/hooks';

import GET_STATS from '../queries/GetStats';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';
const environment = createRelayEnvironment();

const routes = {
  '/': {
    query: GET_STATS,
    variables: {
      global: false,
    }
  }, 
  '/login': {
    query: GET_STATS,
    variables: {
      global: false,
    }
  }, 
  '/write': {
    query: GET_STATS,
    variables: {
      global: false,
    }
  }, 
  '/stats': {
    query: GET_STATS,
    variables: {
      global: false,
    }
  }, 
  '/entries': {
    query: GET_STATS,
    variables: {
      global: false,
    }
  },
};

const RouterRender = ({ children }) => {
  const router = useRouter();
  const setPreloadedQuery = useStoreActions(actions => actions.pages.setPreloadedQuery);

  const { query, variables } = routes[router.pathname];

  const preloadedQuery = preloadQuery(
    environment,
    query,
    variables,
  );

  setPreloadedQuery({ preloadedQuery });

  return (
    <>
      {children}
    </>
  );
}

export default RouterRender;
