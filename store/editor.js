import { action } from 'easy-peasy';

const editor = {
  entry: {},
  openLatestEntry: action((state, payload) => {
    state.entry = payload;
  }),
  saveEntry: action((state, payload) => {
    console.log('act', payload);
    state.entry = payload;
  }),
};

export default editor;