import numeral from 'numeral';

import StatsPanel from './StatsPanel';

const LongestEntryPanel = ({ longestEntry }) => {
  const formattedLongestEntry = longestEntry > 10000
    ? numeral(longestEntry).format('0.0a')
    : longestEntry;

  const data = (
    <div className="flex flex-col">
      <span className="text-5xl">📜</span>
      <span>{formattedLongestEntry}</span>
    </div>
  );

  return (
    <StatsPanel text="longest entry" data={data} />
  );
}

export default LongestEntryPanel;
