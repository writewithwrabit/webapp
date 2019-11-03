import {useState} from 'react';
import styled from '@emotion/styled';

const StyledSpan = styled.span`
  cursor: pointer;
`;

const StatsPill = ({children, selected, name, onClick}) => (
  <StyledSpan
    onClick={() => onClick(name)}
    className={'rounded-full p-2 w-1/2 text-center ' + (selected === name ? 'bg-primary font-bold text-white shadow-md' : '')}
  >
    {children}
  </StyledSpan>
);

const StatsSelector = () => {
  const [selected, setSelected] = useState('me');

  return (
    <div className="bg-gray-300 w-1/5 rounded-full flex justify-between text-sm mx-auto mb-6 shadow-inner">
      <StatsPill selected={selected} name="me" onClick={setSelected}>
        Me
      </StatsPill>

      <StatsPill selected={selected} name="community" onClick={setSelected}>
        Community
      </StatsPill>
    </div>
  );
}

export default StatsSelector;
