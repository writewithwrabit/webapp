import { useState } from 'react';
import Head from 'next/head';

import SignupUser from '../components/SignupUser';
import Plans from '../components/Plans';

const Signup = () => {
  const [stage, setStage] = useState('signup');
  const [user, setUser] = useState({});
  const [plan, setPlan] = useState({});

  const stageComponent = {
    signup: SignupUser,
    plans: Plans,
  }

  const Component = stageComponent[stage];

  return (
    <div className="text-gray-800">
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
      />
    </div>
  );
};

export default Signup;
