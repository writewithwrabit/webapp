import { useEffect } from 'react';

const useGoogleAnalytics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments)
      }

      gtag('js', new Date());
      gtag('config', 'UA-143384618-3', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: window.document.title,
      });
    }
  });
};

export default useGoogleAnalytics;
