import { Suspense } from 'react';
import { startOfDay } from 'date-fns';
import dynamic from 'next/dynamic';

import GetEntry from '../queries/GetEntry';

import withLayout from '../components/Layout';
import withPreloadedQuery from '../components/PreloadedQuery';
import EditorFallback from '../components/EditorFallback';
const Editor = dynamic(
  () => import('../components/Editor'),
  { ssr: false }
);

const Write = () => (
  <Suspense fallback={<EditorFallback />}>
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
