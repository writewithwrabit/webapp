/**
 * @flow
 * @relayHash c8acf20d4c19330596ce280fa8f1a35e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NewUser = {|
  firstName: string,
  lastName?: ?string,
  email: string,
|};
export type SignupUserQueryVariables = {|
  input: NewUser
|};
export type SignupUserQueryResponse = {|
  +createUser: {|
    +id: string,
    +stripeID: ?string,
  |}
|};
export type SignupUserQuery = {|
  variables: SignupUserQueryVariables,
  response: SignupUserQueryResponse,
|};
*/


/*
mutation SignupUserQuery(
  $input: NewUser!
) {
  createUser(input: $input) {
    id
    stripeID
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "NewUser!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createUser",
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
        "name": "stripeID",
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
    "name": "SignupUserQuery",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SignupUserQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "SignupUserQuery",
    "id": null,
    "text": "mutation SignupUserQuery(\n  $input: NewUser!\n) {\n  createUser(input: $input) {\n    id\n    stripeID\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1fdcc7636a790bb14f5959f02c2d0715';

module.exports = node;
