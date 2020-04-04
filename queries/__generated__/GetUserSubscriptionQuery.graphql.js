/**
 * @flow
 * @relayHash b04d8514425370ce4c86db76eb05b8d1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GetUserSubscriptionQueryVariables = {|
  firebaseID: string
|};
export type GetUserSubscriptionQueryResponse = {|
  +userByFirebaseID: {|
    +stripeID: ?string,
    +StripeSubscription: {|
      +id: string,
      +currentPeriodEnd: number,
      +trialEnd: number,
      +cancelAt: number,
      +status: string,
      +plan: {|
        +id: string,
        +nickname: string,
        +product: string,
      |},
    |},
  |}
|};
export type GetUserSubscriptionQuery = {|
  variables: GetUserSubscriptionQueryVariables,
  response: GetUserSubscriptionQueryResponse,
|};
*/


/*
query GetUserSubscriptionQuery(
  $firebaseID: String!
) {
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
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "firebaseID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "firebaseID",
    "variableName": "firebaseID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stripeID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "StripeSubscription",
  "storageKey": null,
  "args": null,
  "concreteType": "StripeSubscription",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "currentPeriodEnd",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "trialEnd",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cancelAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "status",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "plan",
      "storageKey": null,
      "args": null,
      "concreteType": "Plan",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "nickname",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "product",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "GetUserSubscriptionQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userByFirebaseID",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "GetUserSubscriptionQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userByFirebaseID",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GetUserSubscriptionQuery",
    "id": null,
    "text": "query GetUserSubscriptionQuery(\n  $firebaseID: String!\n) {\n  userByFirebaseID(firebaseID: $firebaseID) {\n    stripeID\n    StripeSubscription {\n      id\n      currentPeriodEnd\n      trialEnd\n      cancelAt\n      status\n      plan {\n        id\n        nickname\n        product\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8bcd8a4ac4a3530c681bec42a0fc852c';

module.exports = node;
