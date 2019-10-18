import Header from './Header';

const withLayout = Page => {
  return () => (
    <div>
      <Header />

      <div className="container mx-auto min-h-screen">
        <Page />
      </div>
    </div>
  );
};

export default withLayout;
