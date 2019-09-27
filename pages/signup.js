import { useState } from 'react';
import Link from 'next/link';
import { ApolloConsumer } from '@apollo/react-hooks'

import firebase from '../firebase';

import SignupUser from '../components/SignupUser';
import Plans from '../components/Plans';
import Payment from '../components/SignupUser';

const Signup = () => {
  const [stage, setStage] = useState('signup');
  const [user, setUser] = useState({});
  const [plan, setPlan] = useState({});

  const stageComponent = {
    signup: SignupUser,
    plans: Plans,
    payment: Payment,
  }

  const handleSubmit = (e, client) => {
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const { uid: firebaseID } = user;
      })
      .catch((error) => {
        console.log(error.code, error.message);
    });
  };

  const Component = stageComponent[stage];

  return (
    <ApolloConsumer>
      {
        client => (
          <Component client={client} setUser={setUser} setStage={setStage} setPlan={setPlan} />
        )
      }
    </ApolloConsumer>
  );
};

export default Signup;
