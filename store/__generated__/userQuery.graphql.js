/**
 * @flow
 * @relayHash 1836088525a994a93ffe9ca29f0f2e08
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type userQueryVariables = {|
  firebaseID: string
|};
export type userQueryResponse = {|
  +userByFirebaseID: {|
    +id: string,
    +firstName: string,
    +lastName: ?string,
    +email: string,
    +wordGoal: number,
    +createdAt: string,
    +stripeID: ?string,
  |}
|};
export type userQuery = {|
  variables: userQueryVariables,
  response: userQueryResponse,
|};
*/


/*
query userQuery(
  $firebaseID: String!
) {
  userByFirebaseID(firebaseID: $firebaseID) {
    id
    firstName
    lastName
    email
    wordGoal
    createdAt
    stripeID
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
    "kind": "LinkedField",
    "alias": null,
    "name": "userByFirebaseID",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "firebaseID",
        "variableName": "firebaseID"
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "createdAt",
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
    "name": "userQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "userQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "userQuery",
    "id": null,
    "text": "query userQuery(\n  $firebaseID: String!\n) {\n  userByFirebaseID(firebaseID: $firebaseID) {\n    id\n    firstName\n    lastName\n    email\n    wordGoal\n    createdAt\n    stripeID\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b2af931bf4c11d135313353e88d6d82d';
module.exports = node;
