import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import fetch from 'isomorphic-unfetch'

import firebase from '../../firebase';

let relayEnvironment = null

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : 'https://wrabit-webapp.appspot.com';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery = async (operation, variables, cacheConfig, uploadables) => {
  const token = firebase.auth().currentUser
    ? await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    : '';

  return fetch(`${uri}/query`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    })
  }).then(response => response.json())
}

export default function initEnvironment({ records = {} } = {}) {
  // Create a network layer from the fetch function
  const network = Network.create(fetchQuery);
  const store = new Store(new RecordSource(records));

  // Make sure to create a new Relay environment for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return new Environment({
      network,
      store,
    });
  }

  // reuse Relay environment on client-side
  if (!relayEnvironment) {
    relayEnvironment = new Environment({
      network,
      store,
    });
  }

  return relayEnvironment
}