/**
 * @flow
 * @relayHash 23aafefe8c80c71c3d0866ffbf014fdd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditorQueryVariables = {|
  userID: string,
  date: string,
|};
export type EditorQueryResponse = {|
  +dailyEntry: {|
    +id: string,
    +content: string,
    +wordCount: number,
    +createdAt: string,
  |}
|};
export type EditorQuery = {|
  variables: EditorQueryVariables,
  response: EditorQueryResponse,
|};
*/


/*
query EditorQuery(
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
    "name": "EditorQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "EditorQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "EditorQuery",
    "id": null,
    "text": "query EditorQuery(\n  $userID: ID!\n  $date: String!\n) {\n  dailyEntry(userID: $userID, date: $date) {\n    id\n    content\n    wordCount\n    createdAt\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9bf0c6a617c49b9d65a830bdd8ff9dfc';
module.exports = node;
