import styled from '@emotion/styled';
import ConfettiCanon from 'react-dom-confetti';

const confettiConfig = {
  angle: '225',
  spread: '47',
  startVelocity: '75',
  elementCount: '100',
  dragFriction: '0.10',
  duration: '6000',
  stagger: '2',
  width: '10px',
  height: '10px',
  colors: [
    '#fa557d',
    '#ff1c53',
    '#0a0a3c',
    '#28e6cd',
  ],
};

const StyledConfettiCanon = styled(ConfettiCanon)`
  position: absolute !important;
  right: 20px;
`;

const ProgressBar = ({ goalHit, percentWordsRemaining }) => {
  const progressBarStyles = {
    width: `${goalHit ? '100' : percentWordsRemaining}%`,
  };

  return (
    <div className="progress-bar p-2 bg-offwhite">
      <div className="progress bg-gray-800 h-2 max-w-full rounded-lg" style={progressBarStyles}></div>
      <StyledConfettiCanon active={goalHit} config={confettiConfig} />
    </div>
  )
}

export default ProgressBar;