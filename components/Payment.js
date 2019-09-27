import { useState } from 'react';
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import Link from 'next/link';
import gql from 'graphql-tag'

const CardForm = () => (
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
      onClick={() => submitPlan('yearly')}
    >
      Start Writing Now
    </button>
  </div>
);

const InjectedCardForm = injectStripe(CardForm);

const Payment = () => (
  <StripeProvider apiKey="pk_test_Q6g8knGR5TznI9H5jYRccN1700q0gmHaiy">
    <Elements>
      <InjectedCardForm />
    </Elements>
  </StripeProvider>
);

export default Payment;
