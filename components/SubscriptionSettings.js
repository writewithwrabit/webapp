import { useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { commitMutation } from 'react-relay';
import { formatDistance, fromUnixTime } from 'date-fns';
import Head from 'next/head';

import GET_USER_SUBSCRIPTION from '../queries/GetUserSubscription';
import CANCEL_SUBSCRIPTION from '../queries/CancelSubscription';

import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

const environment = createRelayEnvironment();

import Payment from '../components/Payment';

const buttonClasses = 'font-semibold py-2 px-4 border rounded';

const CancelSubscriptionButton = ({ subscription, setSubscription }) => {
  const cancelSubscription = () => {
    commitMutation(environment, {
      mutation: CANCEL_SUBSCRIPTION,
      variables: {
        subscriptionID: subscription.id,
      },
      onCompleted: () => setSubscription({ ...subscription, status: 'canceled' }),
    });
  }

  return (
    <button
      className={`${buttonClasses} bg-transparent hover:bg-red-500 text-red-700 hover:text-white border-red-500 hover:border-transparent`}
      onClick={cancelSubscription}
    >
      Cancel
    </button>
  );
}

const ResubscribeButton = ({ plan, user, setSubscription }) => {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
    {
      showPayment
        ? <Payment user={user} plan={plan} trial={false} onCompleted={({ subscription }) => setSubscription(subscription)} />
        : (
          <button
            className={`${buttonClasses} bg-primary hover:bg-primary-dark text-white border-primary`}
            onClick={() => setShowPayment(true)}
          >
            Resubscribe
          </button>
        )
    }
    </>
  );
}

const SubscriptionSettings = ({ user }) => {
  const { userByFirebaseID } = useLazyLoadQuery(GET_USER_SUBSCRIPTION, {
    firebaseID: user.firebaseData.uid,
  });
  const { stripeID, StripeSubscription } = userByFirebaseID;
  const [subscription, setSubscription] = useState(StripeSubscription);
  const { status } = subscription;

  const isTrial = status === 'trialing';
  const isCanceled = status === 'canceled';
  
  let periodText = 'Next Billing Date';
  if (isTrial) {
    periodText = 'Trial Ends';
  } else if (isCanceled) {
    periodText = 'Subscription Ends'
  }

  return (
    <div>
      {
        isCanceled && (
          <Head>
            {/* You must import the Stripe.js library from Stripe for compliance reasons */}
            <script src="https://js.stripe.com/v3/"></script>
          </Head>
        )
      }

      <div className="mb-8">
        <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Plan {isCanceled && <span className="text-xs font-semibold text-red-600">(Canceled)</span>}
        </div>

        {subscription.plan.nickname}
      </div>

      <div className="mb-8">
        <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {periodText}
        </div>

        {
          isTrial
            ? formatDistance(new Date(), fromUnixTime(subscription.trialEnd))
            : formatDistance(new Date(), fromUnixTime(subscription.currentPeriodEnd))
        }
      </div>

      {
        isCanceled
          ? <ResubscribeButton plan={subscription.plan.id} user={{ ...user, stripeId: stripeID }} setSubscription={setSubscription} />
          : <CancelSubscriptionButton subscription={subscription} setSubscription={setSubscription} />
      }
    </div>
  );
}

export default SubscriptionSettings;
