import { useState } from 'react';
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import { graphql, commitMutation } from 'react-relay';
import { useStoreActions } from 'easy-peasy';
import { FaSpinner } from 'react-icons/fa';

import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

const environment = createRelayEnvironment();

const CREATE_SUBSCRIPTION = graphql`
  mutation PaymentQuery($input: NewSubscription!) {
    createSubscription(input: $input)
  }
`;

const CardForm = ({ stripe, user, plan }) => {
  const [loading, setLoading] = useState(false);
  const completeUserSignup = useStoreActions(actions => actions.user.completeUserSignup);

  const handleSubmit = () => {
    if (stripe) {
      setLoading(true);

      stripe
        .createToken()
        .then(async ({ token }) => {
          const { id: tokenId } = token;

          commitMutation(environment, {
            mutation: CREATE_SUBSCRIPTION,
            variables: {
              input: {
                stripeId: user.stripeId,
                tokenId,
                subscriptionId: plan,
              }
            },
            onCompleted: () => completeUserSignup({ user }),
          });
        })
        .catch((err) => {
          console.log('Whoops, something went wrong!', err);

          setLoading(false);
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  return (
    <div className="w-full max-w-md mt-10">
      <div className="mb-2 text-center text-sm text-gray-600">
        Enter your credit card information
      </div>
  
      <form className="border border-black border-b-0 rounded-t px-8 pt-6 pb-4">
        <CardElement />
      </form>
  
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-b border-blue-500 border-2 hover:border-blue-700 focus:outline-none focus:shadow-outline w-full"
        type="button"
        onClick={handleSubmit}
      >
        {
          loading
            ? <FaSpinner className="w-full icon-spin" />
            : 'Start Writing Now'
        }
      </button>
    </div>
  );
};

const InjectedCardForm = injectStripe(CardForm);

const Payment = ({ user, plan }) => (
  <StripeProvider apiKey="pk_test_Q6g8knGR5TznI9H5jYRccN1700q0gmHaiy">
    <Elements>
      <InjectedCardForm user={user} plan={plan} />
    </Elements>
  </StripeProvider>
);

export default Payment;
