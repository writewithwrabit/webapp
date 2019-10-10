import Header from './Header';

const withLayout = Page => {
  return () => (
    <div className="container mx-auto min-h-screen">
      <Header />
      <Page />
    </div>
  );
};

export default withLayout;
