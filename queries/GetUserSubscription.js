import { graphql } from 'react-relay/hooks';

const GetUserSubscription = graphql`
query GetUserSubscriptionQuery($firebaseID: String!) {
  userByFirebaseID(firebaseID: $firebaseID) {
    stripeID
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
}`;

export default GetUserSubscription;
