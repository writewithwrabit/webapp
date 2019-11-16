/**
 * @flow
 * @relayHash 4a91ab43b6acf5d84a6a5b380abaf8aa
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
    "text": "query userQuery(\n  $firebaseID: String!\n) {\n  userByFirebaseID(firebaseID: $firebaseID) {\n    id\n    firstName\n    lastName\n    email\n    wordGoal\n    createdAt\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bf3bf6f8ffb9ae7733502e8032c3786a';
module.exports = node;
