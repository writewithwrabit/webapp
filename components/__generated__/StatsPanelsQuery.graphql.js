/**
 * @flow
 * @relayHash 472b42b917e2efb12f614c7b096281b2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StatsPanelsQueryVariables = {|
  global: boolean
|};
export type StatsPanelsQueryResponse = {|
  +stats: {|
    +wordsWritten: number,
    +longestEntry: number,
    +longestStreak: number,
    +preferredDayOfWeek: number,
    +preferredWritingTimes: $ReadOnlyArray<?{|
      +hour: number,
      +count: number,
    |}>,
  |}
|};
export type StatsPanelsQuery = {|
  variables: StatsPanelsQueryVariables,
  response: StatsPanelsQueryResponse,
|};
*/


/*
query StatsPanelsQuery(
  $global: Boolean!
) {
  stats(global: $global) {
    wordsWritten
    longestEntry
    longestStreak
    preferredDayOfWeek
    preferredWritingTimes {
      hour
      count
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "global",
    "type": "Boolean!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "stats",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "global",
        "variableName": "global"
      }
    ],
    "concreteType": "Stats",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "wordsWritten",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "longestEntry",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "longestStreak",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "preferredDayOfWeek",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "preferredWritingTimes",
        "storageKey": null,
        "args": null,
        "concreteType": "PreferredWritingTime",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hour",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "count",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "StatsPanelsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "StatsPanelsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "StatsPanelsQuery",
    "id": null,
    "text": "query StatsPanelsQuery(\n  $global: Boolean!\n) {\n  stats(global: $global) {\n    wordsWritten\n    longestEntry\n    longestStreak\n    preferredDayOfWeek\n    preferredWritingTimes {\n      hour\n      count\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a2779287944fdada68a2fe0be9100b9a';
module.exports = node;
