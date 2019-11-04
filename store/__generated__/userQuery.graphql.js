/**
 * @flow
 * @relayHash 9f77dd25e66b38bf4c2fa5c7480e26eb
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
    "text": "query userQuery(\n  $firebaseID: String!\n) {\n  userByFirebaseID(firebaseID: $firebaseID) {\n    id\n    wordGoal\n    createdAt\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5b54fb2e665fe8c7347561afdbaea289';
module.exports = node;
