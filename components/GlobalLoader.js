import styled from '@emotion/styled';

import Brand from '../public/logos/icon.svg';

const Logo = styled.div`
  @keyframes colorChange {
    0% {
      fill: #FA557D;
    }
    50% {
      fill: #0A0A3C;
    }
    100% {
      fill: #FA557D;
    }
  }

  & svg {
    margin: auto;
    width: 60%;
  }

  & path {
    animation: colorChange 3s infinite;
  }
`;

const GlobalLoader = () => (
  <div className="flex justify-center items-center h-screen w-screen">
    <Logo>
      <Brand />
    </Logo>
  </div>
);

export default GlobalLoader;
