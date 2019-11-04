import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { useStoreState } from 'easy-peasy';
import { startOfDay } from 'date-fns';

import withLayout from '../components/Layout';

import Editor from '../components/Editor';

const GET_ENTRY = graphql`
  query writeQuery($userID: ID!, $date: String!) {
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

  const { dailyEntry } = useLazyLoadQuery(GET_ENTRY, { userID, date });

  return (
    <Editor entry={dailyEntry} date={date} />
  );
}

export default withLayout(Write);
