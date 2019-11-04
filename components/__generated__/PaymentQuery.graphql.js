/**
 * @flow
 * @relayHash c371391afc5d39aff4e37a86c2f7e7cc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NewSubscription = {|
  stripeId: string,
  tokenId: string,
  subscriptionId: string,
|};
export type PaymentQueryVariables = {|
  input: NewSubscription
|};
export type PaymentQueryResponse = {|
  +createSubscription: string
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
  createSubscription(input: $input)
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
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "createSubscription",
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "storageKey": null
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
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "PaymentQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "PaymentQuery",
    "id": null,
    "text": "mutation PaymentQuery(\n  $input: NewSubscription!\n) {\n  createSubscription(input: $input)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9a3cc14f0c733b8dd44e48890d91afe6';
module.exports = node;
