import Document, { Html, Head, Main, NextScript } from 'next/document'
import * as Sentry from '@sentry/browser'

process.on('unhandledRejection', err => {
  Sentry.captureException(err)
});

process.on('uncaughtException', err => {
  Sentry.captureException(err)
});

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps
    };
  }

  render () {
    return (
      <Html>
        <Head>
          {/* TODO: Figure out SSR/next-seo doesn't work */}
          <meta property="og:url" content="https://writewithwrabit.com" class="next-head"/>
          <meta property="og:type" content="website" class="next-head" />
          <meta property="og:title" content="Write With Wrabit" class="next-head" />
          <meta property="og:description" content="Wrabit helps you build a daily writing habit, one small step at a time. Join a community of others as you develop a healthier relationship with yourself." class="next-head" />
          <meta property="og:image" content="https://writewithwrabit.com/static/og.png" class="next-head" />
          <meta property="og:image:alt" content="Write With Wrabit" class="next-head" />
          <meta property="og:site_name" content="Wrabit" class="next-head" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
