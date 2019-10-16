import gql from "graphql-tag";
import { action, thunk } from 'easy-peasy';

import init from '../lib/apollo/init';

const apollo = init();

const GET_USER_BY_FIREBASE_ID = gql`
  query GetUserByFirbaseID($firebaseID: String!) {
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
    const { data } = await apollo.query({
      query: GET_USER_BY_FIREBASE_ID,
      variables: { firebaseID: userID },
    });

    actions.setUserData({
      id: data.userByFirebaseID.id,
      wordGoal: data.userByFirebaseID.wordGoal,
    })
  }),
};

export default user;