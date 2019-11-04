import { Suspense } from 'react';

import withLayout from '../components/Layout';

import Editor from '../components/Editor';

const Write = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Editor />
  </Suspense>
);

export default withLayout(Write);
