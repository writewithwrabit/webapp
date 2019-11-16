import { usePreloadedQuery } from 'react-relay/hooks';
import { useStoreState } from 'easy-peasy';

import GetEntries from '../queries/GetEntries';

import Entry from '../components/Entry';

const EntriesList = ({ startDate, endDate, setUserEntries }) => {
  const { '/entries': preloadedQuery } = useStoreState(state => state.pages.preloadedQueries);
  const { entriesByUserID } = usePreloadedQuery(GetEntries, preloadedQuery);

  setUserEntries(entriesByUserID);

  return (
    <div className="w-full flex-grow">
      {
        entriesByUserID
          .map(entry => <Entry key={entry.id} entry={entry} />)
      }
    </div>
  );
};

export default EntriesList;