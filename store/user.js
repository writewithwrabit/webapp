import { action } from 'easy-peasy';

const userModel = {
  isAuthenticated: false,
  firebaseData: null,
  signInUser: action((state, payload) => {
    state.isAuthenticated = true;
    state.firebaseData = payload;    
  }),
  signOutUser: action(state => {
    state.isAuthenticated = false;
    state.firebaseData = null;
  }),
};

export default userModel;