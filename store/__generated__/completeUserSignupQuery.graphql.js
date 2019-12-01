/**
 * @flow
 * @relayHash 7e18a370239ea3282b87adc625e534a6
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SignedUpUser = {|
  id: string,
  firebaseID: string,
|};
export type completeUserSignupQueryVariables = {|
  input: SignedUpUser
|};
export type completeUserSignupQueryResponse = {|
  +completeUserSignup: {|
    +id: string,
    +firebaseID: ?string,
  |}
|};
export type completeUserSignupQuery = {|
  variables: completeUserSignupQueryVariables,
  response: completeUserSignupQueryResponse,
|};
*/


/*
mutation completeUserSignupQuery(
  $input: SignedUpUser!
) {
  completeUserSignup(input: $input) {
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
    "type": "SignedUpUser!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "completeUserSignup",
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
    "name": "completeUserSignupQuery",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "completeUserSignupQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "completeUserSignupQuery",
    "id": null,
    "text": "mutation completeUserSignupQuery(\n  $input: SignedUpUser!\n) {\n  completeUserSignup(input: $input) {\n    id\n    firebaseID\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'eb940fc91f91580f89b35f51d5d36ba7';
module.exports = node;
