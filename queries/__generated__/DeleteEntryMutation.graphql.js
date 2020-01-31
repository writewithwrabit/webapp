/**
 * @flow
 * @relayHash eb3fd5b5f04cc44b25d57475dc9d13d9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteEntryMutationVariables = {|
  id: string
|};
export type DeleteEntryMutationResponse = {|
  +deleteEntry: {|
    +id: string
  |}
|};
export type DeleteEntryMutation = {|
  variables: DeleteEntryMutationVariables,
  response: DeleteEntryMutationResponse,
|};
*/


/*
mutation DeleteEntryMutation(
  $id: ID!
) {
  deleteEntry(id: $id) {
    id
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
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteEntry",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DeleteEntryMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteEntryMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteEntryMutation",
    "id": null,
    "text": "mutation DeleteEntryMutation(\n  $id: ID!\n) {\n  deleteEntry(id: $id) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e3c84bd965c2344eb5f2bf651faac863';
module.exports = node;
