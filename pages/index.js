import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring'
import Typical from 'react-typical'
import styled from '@emotion/styled';

import '../styles/devices.min.css';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import Header from '../components/Header';
import Sqreen from '../public/sqreen-mono-badge.svg';
import LandingAnimation from '../components/LandingAnimation';
import LandingEditor from '../components/LandingEditor';

// React Spring caclulations
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const heroTextTranslation = (x, y) => `translate3d(${x / 20}px, ${y / 20}px, 0)`;
const sectionTextTranslation = (x, y) => `translate3d(${x / 20}px, ${y / 20}px, 0)`;
const sectionHeaderTranslation = (x, y) => `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;

// Styled Components
const SectionOne = styled.section`
  margin-top: 112px;
  height: ${props => props.isMobile ? 250 : 500}px;
`;

const StyledPhone = styled.div`
  &.iphone-x {
    margin: auto;
    width: 300px;
    height: 600px;
  }

  &.marvel-device.iphone-x .notch { 
    left: 75px;
  }
`;

const GrowingCard = styled.div`
  transition: transform 0.6s;
  &:hover {
    transform: scale(1.2);
  }
`;

const AnimatedLink = styled.a`
  position: relative;
  text-decoration: none;

  &:hover {
    color: ${props => props.isPrimary ? '#FF1C53' : '#fff'};
  }

  &:before {
    content: "";
    position: absolute;
    width: 0%;
    height: 4px;
    bottom: 0;
    left: 0;
    background-color: ${props => props.isPrimary ? '#FF1C53' : '#fff'};
    visibility: hidden;
    transition: all 0.4s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    width: 100%;
  }
`;

const Key = styled.div`
  font-size: 6rem;
`;

const LandingPage = () => {
  useGoogleAnalytics();

  const [parallaxProps, setParallaxProps] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));
  const Hero = styled.section`
    height: calc(100vh - 224px);
    @media (max-width: 640px) {
      height: 100vh;
    }
  `;

  const [editorProps, setEditorProps] = useSpring(() => ({
    top: window.scrollY / 2 * -1,
    left: '50%',
    transform: 'translateX(-50%)',
    config: { mass: 40, tension: 550, friction: 260 },
  }));

  // React Spring scroll function
  const handleScroll = useCallback(() => {
    const amt = (window.innerWidth >= 1024 ? 300 : 460)
    const heightModifier = window.scrollY < amt
      ? window.scrollY / 2 * -1
      : -amt;

    setEditorProps({ top: heightModifier });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <>
      <Header />

      <Hero
        className="container mx-auto relative bg-secondary flex justify-center items-center rounded-lg shadow-md px-10"
        onMouseMove={({ clientX: x, clientY: y }) => setParallaxProps({ xy: calc(x, y) })}
      >
        <LandingAnimation style={{ transform: parallaxProps.xy.interpolate(heroTextTranslation) }}>
          <Typical
            className="typical text-white text-5xl lg:text-6xl"
            steps={[
              'write yourself to ', 1000,
              'write yourself to health', 1500,
              'write yourself to happiness', 1500,
              'write yourself to calm', 1500,
              'write yourself to gratitude', 1500,
              // Hide confidence on mobile because it is too long
              window.innerWidth >= 768 && 'write yourself to confidence', window.innerWidth >= 768 && 1500,
              'write yourself to clarity', 1500,
            ]}
            loop={Infinity}
            wrapper="p"
          />
        </LandingAnimation>
      </Hero>

      <SectionOne className="relative" isMobile={window.innerWidth < 1024}>
        <animated.div className="hidden lg:block absolute" style={editorProps} >
          <div className="marvel-device macbook">
            <div className="top-bar"></div>
            <div className="camera"></div>
            <div className="screen">
              <div className="w-3/4 mx-auto mt-10">
              {window.innerWidth >= 1024 && <LandingEditor placeholder={`Hope you're having a great day, time to write!`} />}
              </div>
            </div>
            <div className="bottom-bar"></div>
          </div>
        </animated.div>

        <animated.div className="block lg:hidden absolute flex w-full" style={editorProps} >
          <StyledPhone className="marvel-device iphone-x">
            <div className="notch">
              <div className="camera"></div>
              <div className="speaker"></div>
            </div>
            <div className="top-bar"></div>
            <div className="sleep"></div>
            <div className="bottom-bar"></div>
            <div className="volume"></div>
            <div className="overflow">
              <div className="shadow shadow--tr"></div>
              <div className="shadow shadow--tl"></div>
              <div className="shadow shadow--br"></div>
              <div className="shadow shadow--bl"></div>
            </div>
            <div className="inner-shadow"></div>
            <div className="screen">
              <div className="mx-auto mt-10">
                {window.innerWidth < 1024 && <LandingEditor placeholder={`How are you feeling today?`} />}
              </div>
            </div>
          </StyledPhone>
        </animated.div>
      </SectionOne>

      <section className="px-12 lg:px-24 pb-24 text-4xl text-gray-800 text-center">
        <p>
          Wrabit helps you build a daily writing habit, one small step at a time.
        </p>

        <p>
          Join a community of others as you develop a healthier relationship with yourself.
        </p>
      </section>

      <section
        className="text-2xl px-10 py-20 lg:px-0 flex flex-col justify-center items-center min-h-screen bg-secondary"
        onMouseMove={({ clientX: x, clientY: y }) => setParallaxProps({ xy: calc(x, y) })}
      >
          <div className="lg:w-1/3 lg:mx-5 mb-5 lg:mb-0 py-5 text-center">
            <LandingAnimation className="text-white text-4xl" element={'p'} style={{ transform: parallaxProps.xy.interpolate(sectionTextTranslation) }}>
              Wrabit's simple editor stays out of your way and lets you focus on the writing. With nobody watching, you can proudly express your unedited self.
            </LandingAnimation>
          </div>

        <LandingAnimation
          className="w-full font-bold px-0 py-10 lg:px-10 text-6xl text-primary text-center tracking-wide"
          style={{ transform: parallaxProps.xy.interpolate(sectionHeaderTranslation) }}
          element='h2'
        >
          <Link href="/signup">
            <AnimatedLink isPrimary>
              express yourself
            </AnimatedLink>
          </Link>
        </LandingAnimation>
      </section>

      <section className="text-2xl px-10 py-20 lg:px-0 flex flex-col justify-center items-center min-h-screen">
        <div className="py-10 lg:p-10 mb-20 lg:w-3/5 text-center">
          <p className="font-bold mb-4 text-4xl text-gray-800">
            Building habits is difficult.
          </p>

          <p>
            James Clear, the author of Atomic Habits, said "Goals are good for setting a direction, but systems are best for making progress." At Wrabit, we focus on creating a platform for you to make progress daily.
          </p>
        </div>


        <div className="w-full flex flex-col lg:flex-row justify-around">
          <GrowingCard className="bg-secondary rounded-lg shadow-md p-10 mb-10 lg:w-3/12 text-center relative">
            <h2 className="text-4xl lg:text-5xl text-primary font-extrabold tracking-wide absolute top-0 -mt-8 md:-mt-10 -ml-16">
              Set Goal
            </h2>

            <p className="text-white">
              How much do you want to write each day? We recommend 1500 words but it's entirely up to you!
            </p>
          </GrowingCard>

          <GrowingCard className="bg-secondary rounded-lg shadow-md p-10 mb-10 lg:w-3/12 text-center relative">
            <h2 className="text-4xl lg:text-5xl text-primary font-extrabold tracking-wide absolute top-0 -mt-8 md:-mt-10 -ml-16">
              Start Small
            </h2>

            <p className="text-white">
              We help you succeed by starting small. On day one we start you a small daily word goal.
            </p>
          </GrowingCard>

          <GrowingCard className="bg-secondary rounded-lg shadow-md p-10 mb-10 lg:w-3/12 text-center relative">
            <h2 className="text-4xl lg:text-5xl text-primary font-extrabold tracking-wide absolute top-0 -mt-8 md:-mt-10 -ml-16">
              Build Habit
            </h2>

            <p className="text-white">
              Every day you hit your target, we increase it until you reach your ultimate goal.
            </p>
          </GrowingCard>
        </div>

        <button className="cta mt-16 text-3xl bg-primary hover:bg-primary-dark text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline">
          <Link href="/signup">
            <a className="text-white">
              Start your writing journey
            </a>
          </Link>
        </button>
      </section>

      <section className="text-2xl lg:text-3xl py-20 px-10 lg:px-48 flex flex-col justify-center items-end min-h-screen bg-primary">
        <h2 className="text-secondary font-bold text-4xl lg:text-6xl text-right mb-4">
          A platform for good.
        </h2>

        <p className="lg:w-2/3 text-right text-secondary mb-4">
          Nearly one in five of us struggle with mental health. Although journaling will not solve all of our struggles, it can positively affect our daily life. At Wrabit, we've had our fair share of difficulties too. That's why we donate portions of your membership fees to the <AnimatedLink className="text-white" href="https://www.bbrfoundation.org/">Brain and Behavior Research Foundation</AnimatedLink>.
        </p>

        <p className="lg:w-2/3 text-right text-secondary font-bold">
          The more you write, the more we donate.
        </p>
      </section>

      <section
        className="text-primary text-center flex justify-center items-center min-h-screen relative"
      >
        <div className="w-full lg:w-2/3 bg-secondary min-h-screen p-10 lg:p-20 flex flex-col justify-center items-center ">
          <Key className="lg:hidden mb-4">
            🔒
          </Key>

          <p className="font-bold text-5xl lg:text-6xl mb-4">
            We encrypt everything.
          </p>

          <p className="text-3xl lg:text-4xl">
            You never have to worry about hiding your diary again.
          </p>
        </div>
        
        <Key className="w-1/3 min-h-screen p-10 lg:p-20 hidden lg:flex flex-col justify-center items-center">
          🔒
        </Key>
      </section>

      <section className="text-4xl px-10 lg:text-6xl text-white text-center flex flex-col justify-center items-center py-40">
        <h2 className="text-secondary font-bold">
          Build your habit today.
        </h2>

        <button className="cta mt-16 text-3xl bg-primary hover:bg-primary-dark text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline">
          <Link href="/signup">
            <a className="text-white">
              Start your writing journey
            </a>
          </Link>
        </button>
      </section>

      <footer className="bg-gray-200 p-20 flex flex-col justify-center items-center text-center">
        <div className="mb-4">
          Made with <span className="text-primary">&#9829;</span> in Vancouver, BC
        </div>

        <a title="Realtime application protection" href="https://www.sqreen.com/?utm_source=badge" className="mb-4">
          <Sqreen className="sqreen" />
        </a>

        <div>
          <Link href="/privacy-policy"><a>Privacy Policy</a></Link> | <Link href="/terms-of-service"><a>Terms of Service</a></Link>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
