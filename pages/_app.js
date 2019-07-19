import React from 'react';
import App, { Container } from 'next/app';
import dynamic from 'next/dynamic';

import { StoreProvider } from 'easy-peasy';
import store from '../store/store';

const Auth = dynamic(() => import('../components/Auth'), { ssr: false });

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <StoreProvider store={store}>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </StoreProvider>
      </Container>
    );
  }
}

export default MyApp;