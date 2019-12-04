/**
 * @flow
 * @relayHash f54b22eb0fdfcbce39d0f29b9cfe4df6
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExistingEntry = {|
  userID: string,
  wordCount: number,
  content: string,
  goalHit: boolean,
|};
export type editorMutationVariables = {|
  id: string,
  input: ExistingEntry,
  date: string,
|};
export type editorMutationResponse = {|
  +updateEntry: {|
    +id: string,
    +content: string,
    +wordCount: number,
    +goalHit: boolean,
  |}
|};
export type editorMutation = {|
  variables: editorMutationVariables,
  response: editorMutationResponse,
|};
*/


/*
mutation editorMutation(
  $id: ID!
  $input: ExistingEntry!
  $date: String!
) {
  updateEntry(id: $id, input: $input, date: $date) {
    id
    content
    wordCount
    goalHit
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ExistingEntry!",
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
    "name": "updateEntry",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "date",
        "variableName": "date"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
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
    "name": "editorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "editorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "editorMutation",
    "id": null,
    "text": "mutation editorMutation(\n  $id: ID!\n  $input: ExistingEntry!\n  $date: String!\n) {\n  updateEntry(id: $id, input: $input, date: $date) {\n    id\n    content\n    wordCount\n    goalHit\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0652b58f4986850ca6f923fa65b14eab';
module.exports = node;
