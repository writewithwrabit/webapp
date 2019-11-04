/**
 * @flow
 * @relayHash dcba4ee4bfe520e27faa45a8f8cc4a2f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdatedUser = {|
  id: string,
  firebaseID?: ?string,
  stripeID?: ?string,
  firstName?: ?string,
  lastName?: ?string,
  email?: ?string,
  wordGoal?: ?number,
|};
export type signupQueryVariables = {|
  input: UpdatedUser
|};
export type signupQueryResponse = {|
  +updateUser: {|
    +id: string,
    +firebaseID: ?string,
  |}
|};
export type signupQuery = {|
  variables: signupQueryVariables,
  response: signupQueryResponse,
|};
*/


/*
mutation signupQuery(
  $input: UpdatedUser!
) {
  updateUser(input: $input) {
    id
    firebaseID
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdatedUser!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateUser",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "firebaseID",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "signupQuery",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "signupQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "signupQuery",
    "id": null,
    "text": "mutation signupQuery(\n  $input: UpdatedUser!\n) {\n  updateUser(input: $input) {\n    id\n    firebaseID\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e2d7978434cafca6393163cfadacf94a';
module.exports = node;
