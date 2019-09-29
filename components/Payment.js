import { useState } from 'react';
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import { useMutation } from '@apollo/react-hooks';
import { FaSpinner } from 'react-icons/fa';
import gql from 'graphql-tag';

const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($stripeId: String!, $tokenId: String!, $subscriptionId: String!) {
    createSubscription(input: { stripeId: $stripeId, tokenId: $tokenId, subscriptionId: $subscriptionId })
  }
`;

const CardForm = ({ stripe, user, plan, completeSignup }) => {
  const [loading, setLoading] = useState(false);
  const [createSubscription] = useMutation(CREATE_SUBSCRIPTION);

  const handleSubmit = () => {
    if (stripe) {
      setLoading(true);

      stripe
        .createToken()
        .then(async ({ token }) => {
          const { id: tokenId } = token;
          await createSubscription({ variables: { stripeId: user.stripeId, tokenId, subscriptionId: plan } });

          completeSignup();
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

const Payment = ({ user, plan, completeSignup }) => (
  <StripeProvider apiKey="pk_test_Q6g8knGR5TznI9H5jYRccN1700q0gmHaiy">
    <Elements>
      <InjectedCardForm user={user} plan={plan} completeSignup={completeSignup} />
    </Elements>
  </StripeProvider>
);

export default Payment;
