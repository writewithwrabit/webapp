import { Suspense } from 'react';
import { startOfDay } from 'date-fns';

import GetEntry from '../queries/GetEntry';

import withLayout from '../components/Layout';
import withPreloadedQuery from '../components/PreloadedQuery';
import Editor from '../components/Editor';

const Write = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Editor />
  </Suspense>
);

export default withLayout(
  withPreloadedQuery(Write, {
    key: '/write',
    query: GetEntry,
    variables: {
      userID: 'REPLACE_ME',
      date: startOfDay(new Date()),
    }
  }),
);
