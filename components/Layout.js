import { useEffect } from 'React';

import Header from './Header';

const withLayout = Page => {
  // Google Analytics
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      window.dataLayer = window.dataLayer || [];
      const gtag = () => dataLayer.push(arguments);

      gtag('js', new Date());
      gtag('config', 'UA-143384618-3', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: window.document.title,
      });
    }
  });

  return () => (
    <div className="container mx-auto min-h-screen">
      <Header />
      <Page />
    </div>
  );
};

export default withLayout;
