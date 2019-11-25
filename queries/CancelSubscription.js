import { graphql } from 'react-relay/hooks';

const CancelSubscription = graphql`
  mutation CancelSubscriptionQuery($subscriptionID: ID!) {
    cancelSubscription(id: $subscriptionID)
  }
`;

export default CancelSubscription;
