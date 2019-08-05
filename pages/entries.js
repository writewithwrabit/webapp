import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useStoreState } from 'easy-peasy';
import { DateRangePicker } from 'react-dates';

import withLayout from '../components/Layout';

const GET_ENTRIES = gql`
  query UserEntries($userID: ID!) {
    entriesByUserID(userID: $userID) {
      id
      wordCount
      createdAt
    }
  }
`;

const renderEntries = (entries) => {
  return entries.map(entry => (
    <div className="bg-white ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center">
      <div>
        <div>
          {entry.createdAt}
        </div>

        <div>
          {entry.wordCount} words written
        </div>
      </div>

      <div>
        0 day streak!
      </div>
    </div>
  ));
}

const Entries = () => {
  const { uid: userID } = useStoreState(state => state.user).firebaseData;

  return (
    <Query query={GET_ENTRIES} variables={{ userID }}>
      {({ loading, error, data}) => {
        if (loading) return (<div>LOADING</div>);
        if (error) return (<div>ERROR</div>);

        const entries = renderEntries(data.entriesByUserID);

        return (
          <div className="flex">
            <DateRangePicker />

            <div className="w-full first-child:-mt-10">
              {entries}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withLayout(Entries);