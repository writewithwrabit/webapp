import { createStore } from 'easy-peasy';

import userModel from './user';

const store = createStore({
  user: userModel,
});

export default store;
