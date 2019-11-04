import { createStore } from 'easy-peasy';

// Models
import user from './user';
import editor from './editor';

const model = {
  user,
  editor,
};

export const store = createStore(model);

export default store;
