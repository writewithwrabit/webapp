import React, { Suspense } from 'react';
import * as Sentry from '@sentry/browser';
import App from 'next/app';
import dynamic from 'next/dynamic';
import { StoreProvider } from 'easy-peasy';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { DefaultSeo } from 'next-seo';

import { store } from '../store/store';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

Sentry.init({ dsn: process.env.SENTRY_DSN });

import '../style.css';
import 'react-day-picker/lib/style.css';
import SEO from '../seo.config.js';

import GlobalLoader from '../components/GlobalLoader';
const Auth = dynamic(() => import('../components/Auth'), { ssr: false });

const environment = createRelayEnvironment();

class WrabitWebapp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

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
      <>
        <DefaultSeo {...SEO} />

        <RelayEnvironmentProvider environment={environment}>
          <StoreProvider store={store}>
            <Auth>
              <Suspense fallback={<GlobalLoader />}>
                <Component {...pageProps} />
              </Suspense>
            </Auth>
          </StoreProvider>
        </RelayEnvironmentProvider>
      </>
    );
  }
}

export default WrabitWebapp;
