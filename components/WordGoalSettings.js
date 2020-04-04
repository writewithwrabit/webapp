import { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import debounce from 'lodash/debounce';
import { commitMutation } from 'react-relay';
import { useSpring, animated } from 'react-spring';

import createRelayEnvironment from '../lib/createRelayEnvironment';
const environment = createRelayEnvironment();

import UpdateUser from '../queries/UpdateUser';

const debouncedUpdateUser = debounce(async ({ id, wordGoal }, wordGoalSaved) => {
  commitMutation(environment, {
    mutation: UpdateUser,
    variables: {
      input: {
        id,
        wordGoal,
      },
    },
    onCompleted: () => wordGoalSaved(),
    onError: err => {}, // TODO: Handle error
  });
}, 1000);

const WordGoalSettings = () => {
  const { id, wordGoal: userWordGoal } = useStoreState(state => state.user);
  const [wordGoal, setWordGoal] = useState(userWordGoal);
  const [status, setStatus] = useState('');
  const [statusSpring, set, stop] = useSpring(() => ({ config: { duration: 500 }, opacity: 0 }));

  useEffect(() => setWordGoal(userWordGoal), [userWordGoal]);

  useEffect(() => {
    if (status) {
      set({ opacity: 1 });
      set({ 
        opacity: 0,
        delay: 2000,
      });
    }

    return () => stop();
  });

  const wordGoalSaved = () => {
    setStatus('saved');
  }

  const updateWordGoal = ({ value }) => {
    setStatus('');

    setWordGoal(value);

    debouncedUpdateUser({
      id,
      wordGoal: parseInt(value),
    }, wordGoalSaved);
  }

  return (
    <div className="mb-4">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="writing-goal">
        Writing Goal
      </label>

      <div className="text-sm text-gray-600 mb-2">
        How much do you want to write each day? In order to help you build a habit, your daily writing goal will be a fraction of this number. The more you write, the closer your be to {wordGoal}. Have you noticed the green bar at the top of the editor? That shows how close you are to hitting your daily writing goal.
      </div>

      <div className="relative">
        <input
          className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
          id="writing-goal"
          type="number"
          min="100"
          placeholder="Writing Goal"
          value={wordGoal}
          onChange={({ target }) => updateWordGoal(target)}
        />

        <div className="uppercase tracking-wide font-bold text-xs text-green-600 absolute">
          <animated.div key={status} style={statusSpring}>{status}</animated.div>
        </div>
      </div>
    </div>
  )
}

export default WordGoalSettings;
