import React from 'react';
import styled from '@emotion/styled';

const errorFaces = [
  {
    src: '/memojis/sad.png',
    alt: 'rabbit frowning',
  },
  {
    src: '/memojis/embarrassed.png',
    alt: 'rabbit embarrassed',
  },
  {
    src: '/memojis/mad.png',
    alt: 'rabbit cursing',
  },
  {
    src: '/memojis/supersad.png',
    alt: 'rabbit crying',
  },
  {
    src: '/memojis/shocked.png',
    alt: 'rabbit with mouth agap',
  },
];

const StyledDiv = styled.div`
  min-height: ${props => props.withLayout ? 'calc(100vh - 60px)' : '100vh'};
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { src, alt } = errorFaces[Math.floor(Math.random() * errorFaces.length)];

    if (this.state.error) {
      return (
        <StyledDiv className="flex flex-col justify-center items-center text-xl" withLayout={this.props.withLayout}>
          <img className="w-1/5 " src={src} alt={alt} />

          <div>
            Yikes, something went wrong.
          </div>

          <div>
            Sorry about that. Refresh and try again!
          </div>
        </StyledDiv>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
