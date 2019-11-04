import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { startOfDay, endOfDay } from 'date-fns'
import { useStoreState } from 'easy-peasy';
import { zonedTimeToUtc } from 'date-fns-tz';

import Entry from '../components/Entry';

const timezoneOffset = new Date().getTimezoneOffset();

const GET_ENTRIES = graphql`
  query EntriesListQuery($userID: ID!, $startDate: String, $endDate: String) {
    entriesByUserID(userID: $userID, startDate: $startDate, endDate: $endDate) {
      id
      wordCount
      createdAt
      content
      goalHit
    }
  }
`;

const EntriesList = ({ startDate, endDate, setUserEntries }) => {

  // GraphQL Query
  const { uid: userID } = useStoreState(state => state.user).firebaseData;
  const utcStartDate = startDate ? zonedTimeToUtc(startOfDay(startDate), timezoneOffset) : null;
  const utcEndDate = endDate ? zonedTimeToUtc(endOfDay(endDate), timezoneOffset) : null;
  const { entriesByUserID } = useLazyLoadQuery(GET_ENTRIES, {
    userID,
    startDate: utcStartDate,
    endDate: utcEndDate,
  });

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