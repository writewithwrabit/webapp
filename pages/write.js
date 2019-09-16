import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import { useStoreState } from 'easy-peasy';

import withLayout from '../components/Layout';

import Editor from '../components/Editor';

const GET_ENTRY = gql`
  query LatestEntry($userID: ID!) {
    latestEntry(userID: $userID) {
      id
      content
      wordCount
    }
  }
`;

const Write = () => {
  const { uid: userID } = useStoreState(state => state.user).firebaseData;
  const { loading, error, data } = useQuery(GET_ENTRY, {
    variables: { userID },
  });

  if (loading) return (<div>LOADING</div>);
  if (error) return (<div>ERROR</div>);

  return (
    <Editor entry={data.latestEntry} />
  );
}

export default withLayout(Write);
