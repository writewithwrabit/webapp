import { useState } from 'react';
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import { graphql, commitMutation } from 'react-relay';
import { FaSpinner } from 'react-icons/fa';

import createRelayEnvironment from '../lib/createRelayEnvironment';
const environment = createRelayEnvironment();

const CREATE_SUBSCRIPTION = graphql`
  mutation PaymentQuery($input: NewSubscription!) {
    createSubscription(input: $input) {
      id
      currentPeriodEnd
      trialEnd
      cancelAt
      status
      plan {
        id
        nickname
        product
      }
    }
  }
`;

const CardForm = ({ stripe, user, plan, onCompleted, trial = false }) => {
  const [loading, setLoading] = useState(false);

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
                trial: trial,
              }
            },
            onCompleted: ({ createSubscription }) => onCompleted({ user, subscription: createSubscription }),
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
        className="bg-primary hover:bg-primary-dark text-white font-bold p-4 rounded-b border-primary border-2 hover:border-primary-dark focus:outline-none focus:shadow-outline w-full"
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

const Payment = ({ user, plan, trial, onCompleted }) => (
  <StripeProvider apiKey={process.env.STRIPE_KEY}>
    <Elements>
      <InjectedCardForm
        user={user}
        plan={plan}
        trial={trial}
        onCompleted={onCompleted}
      />
    </Elements>
  </StripeProvider>
);

export default Payment;
