/**
 * @flow
 * @relayHash ebab3e90881f23a8d91d1a34a1030b4e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NewSubscription = {|
  stripeId: string,
  tokenId: string,
  subscriptionId: string,
  trial: boolean,
|};
export type PaymentQueryVariables = {|
  input: NewSubscription
|};
export type PaymentQueryResponse = {|
  +createSubscription: {|
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
|};
export type PaymentQuery = {|
  variables: PaymentQueryVariables,
  response: PaymentQueryResponse,
|};
*/


/*
mutation PaymentQuery(
  $input: NewSubscription!
) {
  createSubscription(input: $input) {
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "NewSubscription!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createSubscription",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "StripeSubscription",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
          (v1/*: any*/),
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
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PaymentQuery",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "PaymentQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "PaymentQuery",
    "id": null,
    "text": "mutation PaymentQuery(\n  $input: NewSubscription!\n) {\n  createSubscription(input: $input) {\n    id\n    currentPeriodEnd\n    trialEnd\n    cancelAt\n    status\n    plan {\n      id\n      nickname\n      product\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5dde56a7dc51d9b523c42bb70d6d4c20';
module.exports = node;
