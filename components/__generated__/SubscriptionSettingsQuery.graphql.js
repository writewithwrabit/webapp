/**
 * @flow
 * @relayHash 6e0b810061e57d42b11a204456b97db0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SubscriptionSettingsQueryVariables = {|
  firebaseID: string
|};
export type SubscriptionSettingsQueryResponse = {|
  +userByFirebaseID: {|
    +StripeSubscription: ?{|
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
    |}
  |}
|};
export type SubscriptionSettingsQuery = {|
  variables: SubscriptionSettingsQueryVariables,
  response: SubscriptionSettingsQueryResponse,
|};
*/


/*
query SubscriptionSettingsQuery(
  $firebaseID: String!
) {
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "StripeSubscription",
  "storageKey": null,
  "args": null,
  "concreteType": "StripeSubscription",
  "plural": false,
  "selections": [
    (v2/*: any*/),
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
        (v2/*: any*/),
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
    "name": "SubscriptionSettingsQuery",
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
          (v3/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SubscriptionSettingsQuery",
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
          (v3/*: any*/),
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "SubscriptionSettingsQuery",
    "id": null,
    "text": "query SubscriptionSettingsQuery(\n  $firebaseID: String!\n) {\n  userByFirebaseID(firebaseID: $firebaseID) {\n    StripeSubscription {\n      id\n      currentPeriodEnd\n      trialEnd\n      cancelAt\n      status\n      plan {\n        id\n        nickname\n        product\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9ff8b82ebe396387a769f2f32ab2c617';
module.exports = node;
