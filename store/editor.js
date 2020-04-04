import { action, thunk } from 'easy-peasy';
import { graphql, commitMutation } from 'react-relay';

import firebase from '../firebase';
import debounce from 'lodash/debounce';

import createRelayEnvironment from '../lib/createRelayEnvironment';
const environment = createRelayEnvironment();

const UPDATE_ENTRY = graphql`
  mutation editorMutation($id: ID!, $input: ExistingEntry!, $date: String!) {
    updateEntry(id: $id, input: $input, date: $date) {
      id
      content
      wordCount
      goalHit
    }
  }
`;

const debouncedSaveEntry = debounce(async (actions, payload) => {
  const { id, content, wordCount, userID, goalHit, date } = payload;

  commitMutation(environment, {
    mutation: UPDATE_ENTRY,
    variables: {
      id,
      input: {
        userID, 
        content,
        wordCount,
        goalHit,
      },
      date,
    },
    onCompleted: ({ updatedEntry }) => actions.savedEntry(updatedEntry),
    onError: error => {} /* Mutation errored */,
  });
}, 500);

const editor = {
  entry: {},
  openLatestEntry: action((state, payload) => {
    state.entry = payload;
  }),
  savedEntry: action((state, payload) => {
    state.entry = payload;
  }),
  saveEntry: thunk((actions, payload) => {
    const { id, content, wordCount, goalHit, date } = payload;
    const { uid: userID } = firebase.auth().currentUser;
    debouncedSaveEntry(actions, { id, content, wordCount, userID, goalHit, date });
  }),
};

export default editor;