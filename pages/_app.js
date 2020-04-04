import React, { Suspense } from 'react';
import * as Sentry from '@sentry/browser';
import App from 'next/app';
import dynamic from 'next/dynamic';
import { StoreProvider } from 'easy-peasy';
import { DefaultSeo } from 'next-seo';

import { store } from '../store/store';

Sentry.init({ dsn: process.env.SENTRY_DSN });

import '../style.css';
import 'react-day-picker/lib/style.css';
import SEO from '../seo.config.js';

import GlobalLoader from '../components/GlobalLoader';
const Auth = dynamic(() => import('../components/Auth'), { ssr: false });

class WrabitWebapp extends App {
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

        <StoreProvider store={store}>
          <Auth>
            <Suspense fallback={<GlobalLoader />}>
              <Component {...pageProps} />
            </Suspense>
          </Auth>
        </StoreProvider>
      </>
    );
  }
}

export default WrabitWebapp;
