import { createElement } from 'react';
import { animated } from 'react-spring'

const LandingAnimation = ({ element = 'div', className, children, style }) => {
  const isMobile = window.innerWidth <= 640;
  const NormElement = createElement(element, { className }, children);
  const AnimatedElement = animated[element];

  return (
    <>
      {
        isMobile
          ? (
            NormElement
          )
          : (
            <AnimatedElement className={className} style={style}>
              {children}
            </AnimatedElement>
          )
      }
    </>
  )
}

export default LandingAnimation;
