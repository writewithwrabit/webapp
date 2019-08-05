import gql from "graphql-tag";
import { Query } from "react-apollo";
import { DateRangePicker } from 'react-dates';

import firebase from '../firebase';

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
    <div className="bg-white m-10 px-10 py-5 rounded shadow-md">
      {entry.id}
    </div>
  ));
}

const Entries = () => {
  // const { uid: userID } = firebase.auth().currentUser;
  const userID = '0T3AWCd9mkdDFPeV0SDXqj3GRvZ2';

  return (
    <Query query={GET_ENTRIES} variables={{ userID }}>
      {({ loading, error, data}) => {
        if (loading) return (<div>LOADING</div>);
        if (error) return (<div>ERROR</div>);

        const entries = renderEntries(data.entriesByUserID);

        return (
          <div className="flex">
            <DateRangePicker />

            <div>
              {entries}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withLayout(Entries);