/**
 * @flow
 * @relayHash c6aa52acf8e55a433430f1b4eb1d4768
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CancelSubscriptionQueryVariables = {|
  subscriptionID: string
|};
export type CancelSubscriptionQueryResponse = {|
  +cancelSubscription: string
|};
export type CancelSubscriptionQuery = {|
  variables: CancelSubscriptionQueryVariables,
  response: CancelSubscriptionQueryResponse,
|};
*/


/*
mutation CancelSubscriptionQuery(
  $subscriptionID: ID!
) {
  cancelSubscription(id: $subscriptionID)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "subscriptionID",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cancelSubscription",
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "subscriptionID"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CancelSubscriptionQuery",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CancelSubscriptionQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CancelSubscriptionQuery",
    "id": null,
    "text": "mutation CancelSubscriptionQuery(\n  $subscriptionID: ID!\n) {\n  cancelSubscription(id: $subscriptionID)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a5b3c8fb1941fbc30f0c7d5519bfd707';
module.exports = node;
