import { createStore } from 'easy-peasy';

// Models
import user from './user';
import editor from './editor';
import pages from './pages';

const model = {
  user,
  editor,
  pages,
};

export const store = createStore(model);

export default store;
