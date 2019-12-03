import { useState } from 'react';

const WordCounter = ({ wordsWritten, wordGoal, goalHit }) => {
  const storedState = localStorage.getItem('wCountType');
  console.log(storedState);
  const [countType, setCountType] = useState(storedState || 'up');

  let classes = 'text-sm flex-col text-right font-extrabold leading-tight hidden sm:flex';
  classes = goalHit
    ? `${classes} text-green-600 hover:text-green-400`
    : `${classes} hover:text-white`;

  const handleCounterToggle = () => {
    const newCounterType = countType === 'up' ? 'down' : 'up';
    setCountType(newCounterType);
    localStorage.setItem('wCountType', newCounterType);
  }

  const DisplayCount = () => (
    <>
      <span>
        {
          countType === 'up'
            ? wordsWritten
            : wordGoal - wordsWritten
        }
      </span>
      <span>
        words {countType === 'down' && 'reamining'}
      </span>
    </>
  );

  return (
    <div className={classes} style={{ transition: 'color 0.2s'}} onClick={handleCounterToggle}>
      {
        goalHit
          ? <span className="text-2xl">🎉</span>
          : <DisplayCount />
      }
    </div>
  );
}

export default WordCounter;
