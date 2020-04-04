import { graphql } from 'relay-runtime';

const CancelSubscription = graphql`
  mutation CancelSubscriptionQuery($subscriptionID: ID!) {
    cancelSubscription(id: $subscriptionID)
  }
`;

export default CancelSubscription;
