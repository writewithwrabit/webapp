import { thunk } from 'easy-peasy';
import { graphql, commitMutation } from 'react-relay';
import Router from 'next/router';

import firebase from '../firebase';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

const environment = createRelayEnvironment();

const UPDATE_USER = graphql`
  mutation completeUserSignupQuery($input: SignedUpUser!) {
    completeUserSignup(input: $input) {
      id
      firebaseID
    }
  }
`;

export default thunk(async (actions, { user }) => {
  const { id, email, password } = user;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user: firebaseUser }) => {
      const { uid: firebaseID } = firebaseUser;

      commitMutation(environment, {
        mutation: UPDATE_USER,
        variables: {
          input: {
            id,
            firebaseID,
          },
        },
        onCompleted: () => Router.push('/write'),
      });
    })
    .catch((error) => {
      console.log(error.code, error.message);
  });
});