import { useState } from 'react';
import { QueryRenderer, commitMutation } from 'react-relay';
import { formatDistance, fromUnixTime, addDays } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';

import GET_USER_SUBSCRIPTION from '../queries/GetUserSubscription';
import CANCEL_SUBSCRIPTION from '../queries/CancelSubscription';

import createRelayEnvironment from '../lib/createRelayEnvironment';
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
      className={`${buttonClasses} bg-transparent hover:bg-secondary text-secondary hover:text-white border-secondary hover:border-transparent`}
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
        ? <Payment user={user} plan={plan} onCompleted={({ subscription }) => setSubscription(subscription)} />
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

const NewSubscriptionButton = () => {
  const router = useRouter();
 
  return (
    <button
      className={`${buttonClasses} bg-primary hover:bg-primary-dark text-white border-primary`}
      onClick={() => router.push('/subscribe')}
    >
      Pick your subscription
    </button>
  );
}

const SubscriptionSettings = ({ user }) => {
  const { stripeID, StripeSubscription } = user;
  const [subscription, setSubscription] = useState(StripeSubscription);
  const { id, status } = subscription;

  const isTrial = status === 'trialing' || !id;
  const isCanceled = status === 'canceled';

  let periodText = 'Next Billing Date';
  if (isTrial) {
    periodText = 'Trial Ends';
  } else if (isCanceled) {
    periodText = 'Subscription Ends'
  }

  const planNicknameParts = subscription.plan.nickname.split(' ');
  const planText = subscription.plan.nickname
    ? `$${planNicknameParts[1]} per ${planNicknameParts[0].slice(0, -2).toLowerCase()}`
    : 'No plan selected';

  const trialEnd = !id
    ? addDays(new Date(user.createdAt), 30)
    : fromUnixTime(subscription.trialEnd);

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

        {planText}
      </div>

      <div className="mb-8">
        <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {periodText}
        </div>

        {
          isTrial
            ? formatDistance(new Date(), trialEnd)
            : formatDistance(new Date(), fromUnixTime(subscription.currentPeriodEnd))
        }
      </div>

      {
        id
         ? isCanceled
          ? <ResubscribeButton plan={subscription.plan.id} user={{ ...user, stripeId: stripeID }} setSubscription={setSubscription} />
          : <CancelSubscriptionButton subscription={subscription} setSubscription={setSubscription} />
         : <NewSubscriptionButton />
      }
    </div>
  );
}

const SubscriptionContainer = ({ user }) => {
  const render = ({ error, props }) => {
    if (error) {
      throw Error(error);
    } else if (props) {
      return <SubscriptionSettings user={props.userByFirebaseID} />;
    }
  
    return <div>Loading...</div>;
  }

  return (
    <QueryRenderer
      environment={environment}
      query={GET_USER_SUBSCRIPTION}
      variables={{
        firebaseID: user.firebaseData.uid,
      }}
      render={render}
    />
  );
}

export default SubscriptionContainer;
