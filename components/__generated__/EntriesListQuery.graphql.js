/**
 * @flow
 * @relayHash 4f4044210028c628feb5c98b6a29e9f2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EntriesListQueryVariables = {|
  userID: string,
  startDate?: ?string,
  endDate?: ?string,
|};
export type EntriesListQueryResponse = {|
  +entriesByUserID: $ReadOnlyArray<{|
    +id: string,
    +wordCount: number,
    +createdAt: string,
    +content: string,
    +goalHit: boolean,
  |}>
|};
export type EntriesListQuery = {|
  variables: EntriesListQueryVariables,
  response: EntriesListQueryResponse,
|};
*/


/*
query EntriesListQuery(
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
    "name": "EntriesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "EntriesListQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "EntriesListQuery",
    "id": null,
    "text": "query EntriesListQuery(\n  $userID: ID!\n  $startDate: String\n  $endDate: String\n) {\n  entriesByUserID(userID: $userID, startDate: $startDate, endDate: $endDate) {\n    id\n    wordCount\n    createdAt\n    content\n    goalHit\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'de915b5b277c3cdb9263f1980574bfe5';

module.exports = node;
