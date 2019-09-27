import { useState } from 'react';
import Head from 'next/head';
import { ApolloConsumer } from '@apollo/react-hooks'

import firebase from '../firebase';

import SignupUser from '../components/SignupUser';
import Plans from '../components/Plans';

const Signup = () => {
  const [stage, setStage] = useState('plans');
  const [user, setUser] = useState({});
  const [plan, setPlan] = useState({});

  const stageComponent = {
    signup: SignupUser,
    plans: Plans,
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
    <div>
      <Head>
        {/* You must import the Stripe.js library from Stripe for compliance reasons */}
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      
      <ApolloConsumer>
        {
          client => (
            <Component client={client} setUser={setUser} setStage={setStage} setPlan={setPlan} plan={plan} />
          )
        }
      </ApolloConsumer>
    </div>
  );
};

export default Signup;
