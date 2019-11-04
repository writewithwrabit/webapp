import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { graphql, commitMutation } from 'react-relay';

import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

const environment = createRelayEnvironment();

const UPDATE_USER = graphql`
  mutation signupQuery($input: UpdatedUser!) {
    updateUser(input: $input) {
      id
      firebaseID
    }
  }
`;

import firebase from '../firebase';

import SignupUser from '../components/SignupUser';
import Plans from '../components/Plans';

const Signup = () => {
  const router = useRouter();
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
      .then(({ user: firebaseUser }) => {
        // const router = useRouter();
        const { uid: firebaseID } = firebaseUser;

        commitMutation(environment, {
          mutation: UPDATE_USER,
          variables: {
            input: {
              id: user.id,
              firebaseID,
            },
          },
          onCompleted: () => router.push('/write'),
        });
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
      
      <Component
        setUser={setUser}
        user={user}
        setStage={setStage}
        setPlan={setPlan}
        plan={plan}
        completeSignup={completeSignup}
      />
    </div>
  );
};

export default Signup;
