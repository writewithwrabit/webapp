import React from 'react';
import App, { Container } from 'next/app';

import { StoreProvider } from 'easy-peasy';
import store from '../store';

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
          <Component {...pageProps} />
        </StoreProvider>
      </Container>
    );
  }
}

export default MyApp;