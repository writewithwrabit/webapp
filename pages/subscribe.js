import Head from 'next/head';
import { useStoreState } from 'easy-peasy';

import Plans from '../components/Plans';

const Subscribe = () => {
  const user = useStoreState(state => state.user);

  return (
    <>
      <Head>
        {/* You must import the Stripe.js library from Stripe for compliance reasons */}
        <script src="https://js.stripe.com/v3/"></script>
      </Head>

      <Plans user={user} />
    </>
  );
}

export default Subscribe;
