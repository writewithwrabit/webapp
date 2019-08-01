import { action, thunk } from 'easy-peasy';
import gql from "graphql-tag";

import firebase from '../firebase';
import throttle from 'lodash/throttle';
import init from '../lib/apollo/init';

const apollo = init();

const UPDATE_ENTRY = gql`
  mutation UpdateEntry($id: ID!, $input: ExistingEntry!) {
    updateEntry(id: $id, input: $input) {
      id
      content
      wordCount
    }
  }
`;

const throttledSaveEntry = throttle(async (actions, payload) => {
  const { id, content, wordCount, userID } = payload;

  await apollo.mutate({
    mutation: UPDATE_ENTRY,
    variables: {
      id,
      input: {
        userID, 
        content,
        wordCount,
      }
    }
  });

  if (actions) {
    actions.savedEntry(payload);
  }
}, 10000);

const editor = {
  entry: {},
  openLatestEntry: action((state, payload) => {
    state.entry = payload;
  }),
  savedEntry: action((state, payload) => {
    state.entry = payload;
  }),
  saveEntry: thunk((actions, payload) => {
    const { id, content, wordCount } = payload;
    const { uid: userID } = firebase.auth().currentUser;
    throttledSaveEntry(actions, { id, content, wordCount, userID });
  }),
};

export default editor;