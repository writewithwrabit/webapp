import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch'

import firebase from '../../firebase';

let apolloClient = null;

const uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : 'https://wrabit-webapp.appspot.com';


function create (initialState) {
  const isBrowser = typeof window !== 'undefined';

  const httpLink = new HttpLink({
    uri: `${uri}/query`,
    // Use fetch() polyfill on the server
    fetch: !isBrowser && fetch
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: false, // Disables ssrMode
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}