import { createStore } from 'easy-peasy';

// Models
import user from './user';
import editor from './editor';

const store = createStore({
  user,
  editor,
});

export default store;
