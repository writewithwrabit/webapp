import Link from 'next/link';

import GlobalErrorBoundary from '../components/GlobalErrorBoundary';

const NotFound = ({ statusCode }) => {
  if (statusCode !== 404 && statusCode !== 200) {
    throw('Something went wrong...');
  }

  return (
    <div className="flex flex-col justify-center items-center text-xl min-h-screen" >
      <img className="w-1/5 " src="/memojis/embarrassed.png" alt="rabbit embarrassed" />

      <div>
        That's odd, I couldn't find what you were looking for.
      </div>

      <div>
        Why don't we <Link href="/"><a>head back to the homepage?</a></Link>
      </div>
    </div>
  );
}

const Error = ({ statusCode }) => {

  return (
    <GlobalErrorBoundary>
      <NotFound statusCode={statusCode} />
    </GlobalErrorBoundary>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error;
