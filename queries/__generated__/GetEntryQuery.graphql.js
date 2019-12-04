/**
 * @flow
 * @relayHash bf593fe90c59e4e741b37777e3658e22
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GetEntryQueryVariables = {|
  userID: string,
  date: string,
|};
export type GetEntryQueryResponse = {|
  +dailyEntry: {|
    +id: string,
    +content: string,
    +wordCount: number,
    +createdAt: string,
    +goalHit: boolean,
  |}
|};
export type GetEntryQuery = {|
  variables: GetEntryQueryVariables,
  response: GetEntryQueryResponse,
|};
*/


/*
query GetEntryQuery(
  $userID: ID!
  $date: String!
) {
  dailyEntry(userID: $userID, date: $date) {
    id
    content
    wordCount
    createdAt
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
    "name": "date",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "dailyEntry",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "date",
        "variableName": "date"
      },
      {
        "kind": "Variable",
        "name": "userID",
        "variableName": "userID"
      }
    ],
    "concreteType": "Entry",
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
        "name": "content",
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
    "name": "GetEntryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "GetEntryQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "GetEntryQuery",
    "id": null,
    "text": "query GetEntryQuery(\n  $userID: ID!\n  $date: String!\n) {\n  dailyEntry(userID: $userID, date: $date) {\n    id\n    content\n    wordCount\n    createdAt\n    goalHit\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '353aaf07d132009b7e7555267d55a826';
module.exports = node;
