import Header from './Header';
import LayoutErrorBoundary from './LayoutErrorBoundary';

const withLayout = Page => {
  return () => (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto h-full">
        <LayoutErrorBoundary>
          <Page />
        </LayoutErrorBoundary>
      </div>
    </div>
  );
};

export default withLayout;
