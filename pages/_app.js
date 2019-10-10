import React from 'react';
import * as Sentry from '@sentry/browser';
import App, { Container } from 'next/app';
import dynamic from 'next/dynamic';
import { ApolloProvider } from '@apollo/react-hooks'
import { StoreProvider } from 'easy-peasy';

import withApollo from '../lib/apollo/withApollo';
import store from '../store/store';

Sentry.init({dsn: "https://b0529282a1ce4acd9e9f47d2e631ccd4@sentry.io/1511977"});

import '../style.css';

const Auth = dynamic(() => import('../components/Auth'), { ssr: false });

class MyApp extends App {
  componentDidCatch (error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <StoreProvider store={store}>
            <Auth>
              <Component {...pageProps} />
            </Auth>
          </StoreProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
