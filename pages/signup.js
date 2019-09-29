import { useState } from 'react';
import Head from 'next/head';
import { ApolloConsumer } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $firebaseId: String) {
    updateUser(input: { id: $id, firebaseID: $firebaseId }) {
      id
      firebaseID
    }
  }
`;

import firebase from '../firebase';

import SignupUser from '../components/SignupUser';
import Plans from '../components/Plans';

const Signup = () => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [stage, setStage] = useState('signup');
  const [user, setUser] = useState({});
  const [plan, setPlan] = useState({});

  const stageComponent = {
    signup: SignupUser,
    plans: Plans,
  }

  const completeSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(async ({ user: firebaseUser }) => {
        const router = useRouter();
        const { uid: firebaseId } = firebaseUser;

        await updateUser({ variables: { id: user.id, firebaseId }});

        router.push('/write');
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
            <Component
              client={client}
              setUser={setUser}
              user={user}
              setStage={setStage}
              setPlan={setPlan}
              plan={plan}
              completeSignup={completeSignup}
            />
          )
        }
      </ApolloConsumer>
    </div>
  );
};

export default Signup;
