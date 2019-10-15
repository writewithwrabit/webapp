import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import { useStoreState } from 'easy-peasy';
import { startOfDay } from 'date-fns';

import withLayout from '../components/Layout';

import Editor from '../components/Editor';

const GET_ENTRY = gql`
  query DailyEntry($userID: ID!, $date: String!) {
    dailyEntry(userID: $userID, date: $date) {
      id
      content
      wordCount
      createdAt
    }
  }
`;

const Write = () => {
  const { uid: userID } = useStoreState(state => state.user).firebaseData;

  const date = startOfDay(new Date());

  const { loading, error, data } = useQuery(GET_ENTRY, {
    variables: { userID, date },
  });

  if (loading) return (<div>LOADING</div>);
  if (error) return (<div>ERROR</div>);

  return (
    <Editor entry={data.dailyEntry} date={date} />
  );
}

export default withLayout(Write);
