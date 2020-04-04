/**
 * @flow
 * @relayHash 5444ea310bd6b6fcdc7722d4fbae2c46
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GetStatsQueryVariables = {|
  global: boolean
|};
export type GetStatsQueryResponse = {|
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
export type GetStatsQuery = {|
  variables: GetStatsQueryVariables,
  response: GetStatsQueryResponse,
|};
*/


/*
query GetStatsQuery(
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
    "name": "GetStatsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "GetStatsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "GetStatsQuery",
    "id": null,
    "text": "query GetStatsQuery(\n  $global: Boolean!\n) {\n  stats(global: $global) {\n    wordsWritten\n    longestEntry\n    longestStreak\n    preferredDayOfWeek\n    preferredWritingTimes {\n      hour\n      count\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b86274657da24479ecf8256cfed9e1ea';

module.exports = node;
