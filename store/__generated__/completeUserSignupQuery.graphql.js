/**
 * @flow
 * @relayHash 2e8b2c0592327b332c8b9ddf2eacbb4c
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
export type completeUserSignupQueryVariables = {|
  input: UpdatedUser
|};
export type completeUserSignupQueryResponse = {|
  +updateUser: {|
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
    "text": "mutation completeUserSignupQuery(\n  $input: UpdatedUser!\n) {\n  updateUser(input: $input) {\n    id\n    firebaseID\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dfbc755b302abb07c197624b877e869a';
module.exports = node;
