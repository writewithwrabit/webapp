import numeral from 'numeral';

import StatsPanel from './StatsPanel';

const WordsWrittenPanel = ({ wordsWritten }) => {
  const formattedWordsWritten = wordsWritten > 10000
    ? numeral(wordsWritten).format('0.0a')
    : wordsWritten;

  const data = (
    <div className="flex flex-col">
      <span className="text-5xl">✍️</span>
      <span>{formattedWordsWritten}</span>
    </div>
  );

  return (
    <StatsPanel text="words written" data={data} />
  );
}

export default WordsWrittenPanel;
