/**
 * @flow
 * @relayHash 9b375cd9d5f57338373a4e3883c2de28
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GetUserQueryVariables = {|
  firebaseID?: ?string
|};
export type GetUserQueryResponse = {|
  +userByFirebaseID: {|
    +firstName: string,
    +lastName: ?string,
    +email: string,
    +wordGoal: number,
  |}
|};
export type GetUserQuery = {|
  variables: GetUserQueryVariables,
  response: GetUserQueryResponse,
|};
*/


/*
query GetUserQuery(
  $firebaseID: String
) {
  userByFirebaseID(firebaseID: $firebaseID) {
    firstName
    lastName
    email
    wordGoal
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "firebaseID",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "firebaseID",
    "variableName": "firebaseID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastName",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "wordGoal",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "GetUserQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userByFirebaseID",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "GetUserQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userByFirebaseID",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GetUserQuery",
    "id": null,
    "text": "query GetUserQuery(\n  $firebaseID: String\n) {\n  userByFirebaseID(firebaseID: $firebaseID) {\n    firstName\n    lastName\n    email\n    wordGoal\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'faec280345c19ac3804bdc1891dc70b7';

module.exports = node;
