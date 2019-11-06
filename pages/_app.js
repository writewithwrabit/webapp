import React, { Suspense } from 'react';
import * as Sentry from '@sentry/browser';
import App from 'next/app';
import dynamic from 'next/dynamic';
import { StoreProvider } from 'easy-peasy';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { store } from '../store/store';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

Sentry.init({dsn: "https://b0529282a1ce4acd9e9f47d2e631ccd4@sentry.io/1511977"});

import '../style.css';

const Auth = dynamic(() => import('../components/Auth'), { ssr: false });
import RouterRender from '../components/RouterRenderer';

const environment = createRelayEnvironment();

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
    const { Component, pageProps } = this.props;

    return (
        <RelayEnvironmentProvider environment={environment}>
          <StoreProvider store={store}>
            <Auth>
              <Suspense fallback={'Loading...'}>
                <RouterRender>
                  <Component {...pageProps} />
                </RouterRender>
              </Suspense>
            </Auth>
          </StoreProvider>
        </RelayEnvironmentProvider>
    );
  }
}

export default MyApp;
