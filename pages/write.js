import { QueryRenderer, graphql } from 'react-relay';
import { startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { useStoreState } from 'easy-peasy';

import createRelayEnvironment from '../lib/createRelayEnvironment';
const environment = createRelayEnvironment();

const timezoneOffsetHours = new Date().getTimezoneOffset();

import WritePageQuery from '../queries/WritePageQuery.js';

import withLayout from '../components/Layout';
import EditorFallback from '../components/EditorFallback';
import Editor from '../components/Editor';

const render = ({ error, props }) => {
  if (error) {
    throw Error(error);
  } else if (props) {
    return (
      <Editor
        dailyEntry={props.dailyEntry}
        wordGoal={props.wordGoal}
      />
    );
  }

  return <EditorFallback />;
}

const Write = () => {
  const { uid: userID } = useStoreState(state => state.user).firebaseData;

  return (
    <QueryRenderer
      environment={environment}
      query={WritePageQuery}
      variables={{
        userID,
        date: zonedTimeToUtc(
          startOfDay(new Date()),
          timezoneOffsetHours
        ),
      }}
      render={render}
    />
  );
};

export default withLayout(Write);
