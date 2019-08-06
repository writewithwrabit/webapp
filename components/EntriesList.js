import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useStoreState } from 'easy-peasy';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { format, startOfDay, endOfDay, subMinutes } from 'date-fns'

const GET_ENTRIES = gql`
  query UserEntries($userID: ID!, $startDate: String, $endDate: String) {
    entriesByUserID(userID: $userID, startDate: $startDate, endDate: $endDate) {
      id
      wordCount
      createdAt
    }
  }
`;

const timezoneOffset = new Date().getTimezoneOffset();

const formatFriendly = date => {
  const localDate = subMinutes(new Date(date), timezoneOffset);
  return format(localDate, 'MMMM d, yyyy');
};

const renderEntries = (entries) => {
  return entries.map(entry => (
    <div key={entry.id} className="bg-white md:ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center">
      <div>
        <div>
          {formatFriendly(entry.createdAt)}
        </div>

        <div>
          {entry.wordCount} words written
        </div>
      </div>

      {/* <div>
        0 day streak!
      </div> */}
    </div>
  ));
}

const EntriesList = ({ startDate, endDate }) => {
  const { uid: userID } = useStoreState(state => state.user).firebaseData;
  const utcStartDate = startDate ? zonedTimeToUtc(startOfDay(startDate), timezoneOffset) : null;
  const utcEndDate = endDate ? zonedTimeToUtc(endOfDay(endDate), timezoneOffset) : null;

  return (
    <Query query={GET_ENTRIES} variables={{
      userID,
      startDate: utcStartDate,
      endDate: utcEndDate,
    }}>
      {({ loading, error, data}) => {
        if (loading) return (<div>LOADING</div>);
        if (error) return (<div>ERROR</div>);

        const entries = renderEntries(data.entriesByUserID);

        return (
          <div className="w-full flex-grow">
            {entries}
          </div>
        );
      }}
    </Query>
  );
};

export default EntriesList;