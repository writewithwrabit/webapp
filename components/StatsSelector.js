import { useState } from 'react';
import styled from '@emotion/styled';
import { preloadQuery } from 'react-relay/hooks';
import { useStoreActions } from 'easy-peasy';

import GET_STATS from '../queries/GetStats';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';
const environment = createRelayEnvironment();

const StyledSpan = styled.span`
  cursor: pointer;
`;

const StatsPill = ({ children, selected, name, onClick }) => {
  const [preloadedQuery, setPreloadedQuery] = useState(null);
  // const setPreloadedQuery = useStoreActions(actions => actions.pages.setPreloadedQuery);

  const preloadData = (global) => {
    console.log('yooyoyoyoyoy');
    const preloadedQuery = preloadQuery(
      environment,
      GET_STATS,
      { global },
    );
  
    setPreloadedQuery(preloadedQuery);
  };

  return (
    <StyledSpan
      onClick={() => {
        onClick({ selected: name, preloadedQuery });
      }}
      className={'rounded-full p-2 w-1/2 text-center ' + (selected === name ? 'bg-primary font-bold text-white shadow-md' : '')}
      onMouseEnter={() => preloadData(name === 'community')}
    >
      {children}
    </StyledSpan>
  );
}

const StatsSelector = ({selected, setSelected}) => (
  <div className="bg-gray-300 w-1/5 rounded-full flex justify-between text-sm mx-auto mb-6 shadow-inner">
    <StatsPill selected={selected} name="me" onClick={setSelected}>
      Me
    </StatsPill>

    <StatsPill selected={selected} name="community" onClick={setSelected}>
      Community
    </StatsPill>
  </div>
);

export default StatsSelector;
