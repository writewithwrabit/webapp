import { action, thunk } from 'easy-peasy';
import { graphql, fetchQuery } from 'react-relay/hooks';

import completeUserSignup from './completeUserSignup';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

const environment = createRelayEnvironment();

const GET_USER_BY_FIREBASE_ID = graphql`
  query userQuery($firebaseID: String!) {
    userByFirebaseID(firebaseID: $firebaseID) {
      id
      firstName
      lastName
      email
      wordGoal
      createdAt
    }
  }
`;

const user = {
  id: null,
  wordGoal: 1000,
  firstName: null,
  lastName: null,
  email: null,
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
  setUserData: action((state, { id, wordGoal, firstName, lastName, email }) => {
    state.id = id;
    state.wordGoal = wordGoal;
    state.firstName = firstName;
    state.lastName = lastName;
    state.email = email;
  }),
  getUserData: thunk(async (actions, { userID }) => {
    const { userByFirebaseID } = await fetchQuery(environment, GET_USER_BY_FIREBASE_ID, { firebaseID: userID }).toPromise();
    const { id, wordGoal, firstName, lastName, email } = userByFirebaseID;

    actions.setUserData({
      id,
      wordGoal,
      firstName,
      lastName,
      email,
    })
  }),
  completeUserSignup,
};

export default user;