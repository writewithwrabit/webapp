/**
 * @flow
 * @relayHash 4b3d4f6b37ef717489e17f165c13b331
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
export type UpdateUserMutationVariables = {|
  input: UpdatedUser
|};
export type UpdateUserMutationResponse = {|
  +updateUser: {|
    +id: string,
    +firebaseID: ?string,
    +stripeID: ?string,
    +firstName: string,
    +lastName: ?string,
    +email: string,
    +wordGoal: number,
  |}
|};
export type UpdateUserMutation = {|
  variables: UpdateUserMutationVariables,
  response: UpdateUserMutationResponse,
|};
*/


/*
mutation UpdateUserMutation(
  $input: UpdatedUser!
) {
  updateUser(input: $input) {
    id
    firebaseID
    stripeID
    firstName
    lastName
    email
    wordGoal
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "stripeID",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "firstName",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "lastName",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "email",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "wordGoal",
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
    "name": "UpdateUserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateUserMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateUserMutation",
    "id": null,
    "text": "mutation UpdateUserMutation(\n  $input: UpdatedUser!\n) {\n  updateUser(input: $input) {\n    id\n    firebaseID\n    stripeID\n    firstName\n    lastName\n    email\n    wordGoal\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2e19f6ed7a0ebeb5bbd825d1c7099910';

module.exports = node;
