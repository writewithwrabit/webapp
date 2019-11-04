/**
 * @flow
 * @relayHash fe7533c3a4450ab7055d4ffe3cf8026b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type writeQueryVariables = {|
  userID: string,
  date: string,
|};
export type writeQueryResponse = {|
  +dailyEntry: {|
    +id: string,
    +content: string,
    +wordCount: number,
    +createdAt: string,
  |}
|};
export type writeQuery = {|
  variables: writeQueryVariables,
  response: writeQueryResponse,
|};
*/


/*
query writeQuery(
  $userID: ID!
  $date: String!
) {
  dailyEntry(userID: $userID, date: $date) {
    id
    content
    wordCount
    createdAt
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "writeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "writeQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "writeQuery",
    "id": null,
    "text": "query writeQuery(\n  $userID: ID!\n  $date: String!\n) {\n  dailyEntry(userID: $userID, date: $date) {\n    id\n    content\n    wordCount\n    createdAt\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1077cf76410cd04a15b4dc41433a05a5';
module.exports = node;
