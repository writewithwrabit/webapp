/**
 * @flow
 * @relayHash cdf542ac44624a2a1af2cccd199e0e7f
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
    +goalHit: boolean,
  |},
  +wordGoal: number,
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
    goalHit
  }
  wordGoal(userID: $userID, date: $date)
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
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "dailyEntry",
    "storageKey": null,
    "args": (v1/*: any*/),
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
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "wordGoal",
    "args": (v1/*: any*/),
    "storageKey": null
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
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "writeQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "writeQuery",
    "id": null,
    "text": "query writeQuery(\n  $userID: ID!\n  $date: String!\n) {\n  dailyEntry(userID: $userID, date: $date) {\n    id\n    content\n    wordCount\n    createdAt\n    goalHit\n  }\n  wordGoal(userID: $userID, date: $date)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b753b305136c6c19cdb94bbc3949fc94';

module.exports = node;
