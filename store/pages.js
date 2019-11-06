import { action } from 'easy-peasy';

const pages = {
  preloadedQuery: null,
  setPreloadedQuery: action((state, { preloadedQuery }) => {
    state.preloadedQuery = preloadedQuery;
  }),
};

export default pages;
