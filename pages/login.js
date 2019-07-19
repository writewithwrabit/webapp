import { useState } from 'react';
import firebase from '../firebase';
import { useRouter } from 'next/router';
import { useStoreState, useStoreActions } from 'easy-peasy';

import withLayout from '../components/Layout';

const Login = () => {
  const router = useRouter();
  const user = useStoreState(state => state.user);
  const signInUser = useStoreActions(actions => actions.user.signInUser);

  if (user.isAuthenticated) {
    router.push('/write');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (!user.isAuthenticated && firebaseUser) {
      signInUser(firebaseUser);
      router.push('/write');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error.code, error.message);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} type="email" onChange={({ target }) => setEmail(target.value)} />
        <input placeholder="Password" value={password} type="password" onChange={({ target }) => setPassword(target.value)} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default withLayout(Login);
