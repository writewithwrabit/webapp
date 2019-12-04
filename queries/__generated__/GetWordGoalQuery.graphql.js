/**
 * @flow
 * @relayHash a2cbba047512ed84289bbe6e5b933ccf
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GetWordGoalQueryVariables = {|
  userID: string
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
) {
  wordGoal(userID: $userID)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userID",
    "type": "ID!",
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
    "text": "query GetWordGoalQuery(\n  $userID: ID!\n) {\n  wordGoal(userID: $userID)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '75033a29cc8a58c72077ccbee7b734b5';
module.exports = node;
