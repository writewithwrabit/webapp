import { QueryRenderer, graphql } from 'react-relay';
import Link from 'next/link';
import { format, startOfDay, endOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import createRelayEnvironment from '../lib/createRelayEnvironment';
const environment = createRelayEnvironment();

const timezoneOffset = new Date().getTimezoneOffset();

import Entry from '../components/Entry';
import EntriesListFallback from '../components/EntriesListFallback';

const NoEntriesFound = () => (
  <div className="text-center">
    <div className="text-6xl">
      🔎
    </div>

    <div>
      No entries found.
    </div>

    <div>
      <Link href="/write">
        <a>Get started today!</a>
      </Link>
    </div>
  </div>
);

const EntriesList = ({ userID, startDate, endDate, userEntries, setUserEntries }) => {
  const renderEntries = ({ error, props }) => {
    if (error) {
      throw Error(error);
    } else if (props) {
      let { entriesByUserID } = props;
      entriesByUserID = entriesByUserID.filter(Boolean);

      if (userEntries.length !== entriesByUserID.length) {
        setUserEntries(entriesByUserID);
      }

      return (
        <div className="w-full flex-grow">
          {
            entriesByUserID.length
              ? entriesByUserID.map(entry => <Entry key={entry.id} entry={entry} />)
              : <NoEntriesFound />
          }
        </div>
      );
    }
  
    return <EntriesListFallback />;
  }

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
      query EntriesListQuery($userID: ID!, $startDate: String, $endDate: String) {
        entriesByUserID(userID: $userID, startDate: $startDate, endDate: $endDate) {
          id
          wordCount
          createdAt
          content
          goalHit
        }
      }
    `}
      variables={{
        userID,
        startDate: startDate && format(
          zonedTimeToUtc(startOfDay(startDate), timezoneOffset),
          'yyyy-MM-dd HH:mm:ss.000'
        ),
        endDate: endDate && format(
          zonedTimeToUtc(endOfDay(endDate), timezoneOffset),
          'yyyy-MM-dd HH:mm:ss.000'
        ),
      }}
      render={renderEntries}
    />
  );
};

export default EntriesList;