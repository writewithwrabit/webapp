import { action, thunk } from 'easy-peasy';
import { graphql, fetchQuery } from 'react-relay/hooks';

import completeUserSignup from './completeUserSignup';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

const environment = createRelayEnvironment();

const GET_USER_BY_FIREBASE_ID = graphql`
  query userQuery($firebaseID: String!) {
    userByFirebaseID(firebaseID: $firebaseID) {
      id
      wordGoal
      createdAt
    }
  }
`;

const user = {
  id: null,
  // Default word goal in case something goes wrong
  wordGoal: 1000,
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
  setUserData: action((state, { id, wordGoal }) => {
    state.id = id;
    state.wordGoal = wordGoal;
  }),
  getUserData: thunk(async (actions, { userID }) => {
    const data = await fetchQuery(environment, GET_USER_BY_FIREBASE_ID, { firebaseID: userID }).toPromise();

    actions.setUserData({
      id: data.userByFirebaseID.id,
      wordGoal: data.userByFirebaseID.wordGoal,
    })
  }),
  completeUserSignup,
};

export default user;