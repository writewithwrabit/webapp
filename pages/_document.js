import Document, { Html, Head, Main, NextScript } from 'next/document'
import * as Sentry from '@sentry/browser'

process.on('unhandledRejection', err => {
  Sentry.captureException(err)
});

process.on('uncaughtException', err => {
  Sentry.captureException(err)
});

class WrabitDocument extends Document {
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
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-143384618-3"></script>
          <script type="text/javascript" src="crisp.js"></script>
          {/* Favicons */}
          <link rel="apple-touch-icon" sizes="57x57" href="favicons/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="favicons/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="favicons/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="favicons/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="favicons/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="favicons/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="favicons/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="favicons/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192"  href="favicons/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="favicons/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
          <link rel="manifest" href="favicons/manifest.json" />
          <meta name="msapplication-TileImage" content="favicons/ms-icon-144x144.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WrabitDocument;
