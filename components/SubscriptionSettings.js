import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { formatDistance, fromUnixTime } from 'date-fns'

const GET_USER_SUBSCRIPTION = graphql`
  query SubscriptionSettingsQuery($firebaseID: String!) {
    userByFirebaseID(firebaseID: $firebaseID) {
      StripeSubscription {
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
  }
`;

const SubscriptionSettings = ({ user }) => {
  const { userByFirebaseID } = useLazyLoadQuery(GET_USER_SUBSCRIPTION, {
    firebaseID: user.firebaseData.uid,
  });

  const { StripeSubscription } = userByFirebaseID;
  const isTrial = StripeSubscription.status === 'trialing';

  return (
    <div>
      <div className="mb-8">
        <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Plan
        </div>

        {StripeSubscription.plan.nickname}
      </div>

      <div className="mb-8">
        <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {
            isTrial
              ? 'Trial Ends'
              : 'Next Billing Date'
          }
        </div>

        {
          isTrial
            ? formatDistance(new Date(), fromUnixTime(StripeSubscription.trialEnd))
            : formatDistance(new Date(), fromUnixTime(StripeSubscription.currentPeriodEnd))
        }
      </div>

      {/* <button disabled className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
        {
          StripeSubscription.status === 'canceled'
            ? 'Restart'
            : 'Cancel'
        }
      </button> */}
    </div>
  );
}

export default SubscriptionSettings;
