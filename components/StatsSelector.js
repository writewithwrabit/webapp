import {useState} from 'react';

const StatsPill = ({ children, selected, name, onClick }) => (
  <span
    onClick={() => onClick(name)}
    className={'rounded-full p-2 w-1/2 text-center ' + (selected === name ? 'bg-primary font-bold' : '')}
  >
    {children}
  </span>
);

const StatsSelector = () => {
  const [selected, setSelected] = useState('me');

  return (
    <div className="bg-gray-300 w-1/5 rounded-full flex justify-between text-sm mx-auto mb-6">
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
