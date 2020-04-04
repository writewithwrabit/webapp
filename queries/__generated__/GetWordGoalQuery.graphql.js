/**
 * @flow
 * @relayHash 99f40d0fe2bf9956ea42b06ded5545d4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GetWordGoalQueryVariables = {|
  userID: string,
  date: string,
|};
export type GetWordGoalQueryResponse = {|
  +wordGoal: number
|};
export type GetWordGoalQuery = {|
  variables: GetWordGoalQueryVariables,
  response: GetWordGoalQueryResponse,
|};
*/


/*
query GetWordGoalQuery(
  $userID: ID!
  $date: String!
) {
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
    "kind": "ScalarField",
    "alias": null,
    "name": "wordGoal",
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
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "GetWordGoalQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "GetWordGoalQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "GetWordGoalQuery",
    "id": null,
    "text": "query GetWordGoalQuery(\n  $userID: ID!\n  $date: String!\n) {\n  wordGoal(userID: $userID, date: $date)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '73754ba833be22a547f26687899b24b2';

module.exports = node;
