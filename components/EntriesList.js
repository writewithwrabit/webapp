import { usePreloadedQuery } from 'react-relay/hooks';
import { startOfDay, endOfDay } from 'date-fns'
import { useStoreState } from 'easy-peasy';
import { zonedTimeToUtc } from 'date-fns-tz';

import GetEntries from '../queries/GetEntries';

import Entry from '../components/Entry';

const timezoneOffset = new Date().getTimezoneOffset();

const EntriesList = ({ startDate, endDate, setUserEntries }) => {
  const { '/entries': preloadedQuery } = useStoreState(state => state.pages.preloadedQueries);
  const { entriesByUserID } = usePreloadedQuery(GetEntries, preloadedQuery);

  const utcStartDate = startDate ? zonedTimeToUtc(startOfDay(startDate), timezoneOffset) : null;
  const utcEndDate = endDate ? zonedTimeToUtc(endOfDay(endDate), timezoneOffset) : null;
  // const { entriesByUserID } = useLazyLoadQuery(GET_ENTRIES, {
  //   userID,
  //   startDate: utcStartDate,
  //   endDate: utcEndDate,
  // });

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