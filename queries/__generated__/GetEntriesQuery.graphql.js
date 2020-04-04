/**
 * @flow
 * @relayHash 072ec501eaaafc373cc44b3164e0462b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GetEntriesQueryVariables = {|
  userID: string,
  startDate?: ?string,
  endDate?: ?string,
|};
export type GetEntriesQueryResponse = {|
  +entriesByUserID: $ReadOnlyArray<{|
    +id: string,
    +wordCount: number,
    +createdAt: string,
    +content: string,
    +goalHit: boolean,
  |}>
|};
export type GetEntriesQuery = {|
  variables: GetEntriesQueryVariables,
  response: GetEntriesQueryResponse,
|};
*/


/*
query GetEntriesQuery(
  $userID: ID!
  $startDate: String
  $endDate: String
) {
  entriesByUserID(userID: $userID, startDate: $startDate, endDate: $endDate) {
    id
    wordCount
    createdAt
    content
    goalHit
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userID",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "startDate",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "endDate",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "entriesByUserID",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "endDate",
        "variableName": "endDate"
      },
      {
        "kind": "Variable",
        "name": "startDate",
        "variableName": "startDate"
      },
      {
        "kind": "Variable",
        "name": "userID",
        "variableName": "userID"
      }
    ],
    "concreteType": "Entry",
    "plural": true,
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
        "name": "wordCount",
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
        "name": "content",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "goalHit",
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
    "name": "GetEntriesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "GetEntriesQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "GetEntriesQuery",
    "id": null,
    "text": "query GetEntriesQuery(\n  $userID: ID!\n  $startDate: String\n  $endDate: String\n) {\n  entriesByUserID(userID: $userID, startDate: $startDate, endDate: $endDate) {\n    id\n    wordCount\n    createdAt\n    content\n    goalHit\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '782015e2ff369bf8b1cb739638b3bd06';

module.exports = node;
