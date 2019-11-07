import { action } from 'easy-peasy';

const pages = {
  preloadedQueries: {
    '/stats': null,
    '/write': null,
    '/entries': null,
  },
  setPreloadedQuery: action((state, { key, preloadedQuery }) => {
    state.preloadedQueries[key] = preloadedQuery;
  }),
};

export default pages;
