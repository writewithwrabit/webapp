import AppHeader from './AppHeader';
import LayoutErrorBoundary from './GlobalErrorBoundary';

const withLayout = Page => {
  return () => (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto h-full">
        <LayoutErrorBoundary withLayout>
          <Page />
        </LayoutErrorBoundary>
      </div>
    </div>
  );
};

export default withLayout;
