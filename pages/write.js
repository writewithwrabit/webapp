import { Suspense } from 'react';
import { startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import dynamic from 'next/dynamic';

const timezoneOffsetHours = new Date().getTimezoneOffset();

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
      date: zonedTimeToUtc(
        startOfDay(new Date()),
        timezoneOffsetHours
      ),
    }
  })
);
