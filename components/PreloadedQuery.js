import { useStoreActions, useStoreState } from 'easy-peasy';
import { preloadQuery } from 'react-relay/hooks';

import createRelayEnvironment from '../lib/createRelayEnvironment';
const environment = createRelayEnvironment();

const withPreloadedQuery = (Component, { key, query, variables }) => {
  return () => {
    const setPreloadedQuery = useStoreActions(actions => actions.pages.setPreloadedQuery);
    const { uid: userID } = useStoreState(state => state.user).firebaseData;

    if (variables.userID) {
      variables.userID = userID;
    }

    const preloadedQuery = preloadQuery(
      environment,
      query,
      variables,
    );

    setPreloadedQuery({ key, preloadedQuery });

    return <Component />;
  }
}

export default withPreloadedQuery;
