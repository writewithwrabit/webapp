import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring'
import { NextSeo } from 'next-seo';
import Typical from 'react-typical'
import styled from '@emotion/styled';

import '../styles/devices.min.css';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import SEO from '../seo.config.js';

import LogoIcon from '../public/logos/icon.svg';
import LogoName from '../public/logos/name.svg';
import LandingEditor from '../components/LandingEditor';
import Sqreen from '../public/sqreen-mono-badge.svg';

// React Spring caclulations
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const heroTextTranslation = (x, y) => `translate3d(${x / 20}px, ${y / 20}px, 0)`;
const sectionTextTranslation = (x, y) => `translate3d(${x / 20}px, ${y / 20}px, 0)`;
const sectionHeaderTranslation = (x, y) => `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
const key1Translation = (x, y) => `translate3d(${x * 0.8}px, ${y * 0.8}px, 0)`;

// Styled Components
const SectionOne = styled.section`
  margin-top: 112px;
  height: 500px;
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
    color: #fff;
  }

  &:before {
    content: "";
    position: absolute;
    width: 0%;
    height: 4px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    visibility: hidden;
    transition: all 0.4s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    width: 100%;
  }
`;

const Key = styled.div`
  bottom: 45vh;
  right: -20vw;
  font-size: 6rem;
`;

const LandingPage = () => {
  useGoogleAnalytics();

  const user = useStoreState(state => state.user);

  const [parallaxProps, setParallaxProps] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
  const Hero = styled.section`
    height: calc(100vh - 224px);
    @media (max-width: 640px) {
      height: 100vh;
    }
  `;

  const [editorProps, setEditorProps] = useSpring(() => {
    return {
      top: window.scrollY / 2 * -1,
      left: window.innerWidth / 2 - (window.innerWidth >= 1024 ? 520 : 213),
      config: { mass: 10, tension: 550, friction: 140 },
    }
  });

  // React Spring scroll function
  const handleScroll = useCallback(() => {
    const amt = (window.innerWidth >= 1024 ? 300 : 460)
    const heightModifier = window.scrollY < amt
      ? window.scrollY / 2 * -1
      : -amt;

    setEditorProps({ top: heightModifier });
  }, []);

  const handleResize = useCallback(() => {
    const widthModifier = window.innerWidth >= 1024 ? 520 : 213;
    setEditorProps({ left: window.innerWidth / 2 - widthModifier });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll');
      window.removeEventListener('resize');
    };
  }, []);

  return (
    <>
      <NextSeo {...SEO} />

      <header className="relative px-4 lg:px-20">
        <nav id="nav" className="py-6 lg:py-10 flex justify-between items-center">
          <LogoName className="w-24 md:w-32" />

          <div className="font-bold">
            {
              user.isAuthenticated
                ? (
                  <Link href="/write">
                    <a className="flex items-center">
                      Go to editor
                      <FaLongArrowAltRight className="ml-2" />
                    </a>
                  </Link>
                )
                : (
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                )
            }
            </div>
        </nav>
      </header>

      <Hero
        className="container mx-auto relative bg-secondary flex justify-center items-center rounded-lg shadow-md px-10"
        onMouseMove={({ clientX: x, clientY: y }) => setParallaxProps({ xy: calc(x, y) })}
      >
        <animated.div style={{ transform: parallaxProps.xy.interpolate(heroTextTranslation) }}>
          <Typical
            className="typical text-white text-6xl"
            steps={[
              'write yourself to', 1000,
              'write yourself to health', 1500,
              'write yourself to happiness', 1500,
              'write yourself to calm', 1500,
              'write yourself to gratitude', 1500,
              'write yourself to confidence', 1500,
              'write yourself to clarity', 1500,
            ]}
            loop={Infinity}
            wrapper="p"
          />
        </animated.div>
      </Hero>

      <SectionOne className="relative">
        <animated.div className="hidden lg:block absolute" style={editorProps} >
          <div className="marvel-device macbook">
            <div className="top-bar"></div>
            <div className="camera"></div>
            <div className="screen">
              <div className="w-3/4 mx-auto mt-10">
                <LandingEditor />
              </div>
            </div>
            <div className="bottom-bar"></div>
          </div>
        </animated.div>

        <animated.div className="block lg:hidden absolute" style={editorProps} >
          <div className="marvel-device iphone-x">
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
                <LandingEditor />
              </div>
            </div>
          </div>
        </animated.div>
      </SectionOne>

      <section className="px-24 pb-24 text-4xl text-gray-800">
        <p>
          Wrabit helps you build a daily writing habit, one small step at a time.
        </p>

        <p>
          Join a community of others as you develop a healthier relationship with yourself.
        </p>
      </section>

      <section
        className="text-2xl px-10 lg:p-0 flex flex-col justify-center items-center min-h-screen bg-secondary"
        onMouseMove={({ clientX: x, clientY: y }) => setParallaxProps({ xy: calc(x, y) })}
      >
          <div className="lg:w-1/3 lg:mx-5 mb-5 lg:mb-0 px-10 py-5 rounded shadow-md text-center">
            <animated.p className="text-white text-4xl" style={{ transform: parallaxProps.xy.interpolate(sectionTextTranslation) }}>
              Wrabit's simplistic editor stays out of your way and let's you focus on the writing. With nobody watching, you can proudly express your unedited self.
            </animated.p>
          </div>

        <animated.h2 className="w-full font-bold mb-4 p-10 text-6xl text-primary text-center tracking-wide" style={{ transform: parallaxProps.xy.interpolate(sectionHeaderTranslation) }}>
          express yourself
        </animated.h2>
      </section>

      <section className="text-2xl px-10 lg:p-0 flex flex-col justify-center items-center min-h-screen">
        <div className="p-10 mb-20 lg:w-3/5 text-center">
          <p className="font-bold mb-4 text-4xl text-gray-800">
            Building habits is difficult.
          </p>

          <p>
            James Clear, the author of Atomic Habits, said "Goals are good for setting a direction, but systems are best for making progress." At Wrabit, we focus on creating a platform for you to make progress daily.
          </p>
        </div>


        <div className="w-full flex flex-col lg:flex-row justify-around">
          <GrowingCard className="bg-secondary rounded-lg shadow-md p-10 mb-10 lg:w-1/5 text-center relative">
            <h2 className="text-5xl text-primary font-extrabold tracking-wide absolute top-0 -mt-10 -ml-16">
              Set Your Goal
            </h2>

            <p className="text-white">
              How much do you want to write each day? We recommend 1500 words but it's entirely up to you!
            </p>
          </GrowingCard>

          <GrowingCard className="bg-secondary rounded-lg shadow-md p-10 mb-10 lg:w-1/5 text-center relative">
            <h2 className="text-5xl text-primary font-extrabold tracking-wide absolute top-0 -mt-10 -ml-16">
              Start Small
            </h2>

            <p className="text-white">
              We help you succeed by starting small. On day one we start you a small daily word goal.
            </p>
          </GrowingCard>

          <GrowingCard className="bg-secondary rounded-lg shadow-md p-10 mb-10 lg:w-1/5 text-center relative">
            <h2 className="text-5xl text-primary font-extrabold tracking-wide absolute top-0 -mt-10 -ml-16">
              Build The Habit
            </h2>

            <p className="text-white">
              Every day you hit your target, we increase it until you reach your ultimate goal.
            </p>
          </GrowingCard>
        </div>
      </section>

      <section className="text-2xl lg:text-3xl px-10 lg:px-48 flex flex-col justify-center items-end min-h-screen bg-primary">
        <h2 className="text-secondary font-bold text-4xl lg:text-6xl text-right mb-4">
          A platform for good.
        </h2>

        <p className="lg:w-2/3 text-right text-secondary mb-4">
          Nearly one in five of us struggle with mental health. Although journaling will not solve all of our struggles, it can positively effect our daily life. At Wrabit, we've had our fair share of difficulties too. That's why we donate portions of your membership fees to the <AnimatedLink className="text-white" href="https://www.bbrfoundation.org/">Brain and Behavior Research Foundation</AnimatedLink>.
        </p>

        <p className="lg:w-2/3 text-right text-secondary font-bold">
          The more you write, the more we donate.
        </p>
      </section>

      <section
        className="container text-4xl lg:text-6xl text-primary text-center flex flex-col justify-center items-center min-h-screen bg-secondary relative p-10 lg:p-20"
        onMouseMove={({ clientX: x, clientY: y }) => setParallaxProps({ xy: calc(x, y) })}
      >
        <p className="text-6xl lg:hidden mb-4">
          🔒
        </p>

        <p className="z-10">
          We encrypt everything.
        </p>

        <p className="z-0">
          You never have to worry about hiding your diary again.
        </p>

        <Key className="absolute" >🔒</Key>
      </section>

      <section className="text-4xl lg:text-6xl text-white text-center flex flex-col justify-center items-center py-40">
        <h2 className="relative text-secondary">
          Build your habit today.
        </h2>

        <button className="cta mt-16 text-3xl bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <Link href="/signup">
            <a className="text-white">
              Start your writing journey
            </a>
          </Link>
        </button>
      </section>

      <footer className="bg-gray-200 p-40 flex justify-center items-center">
        <a title="Realtime application protection" href="https://www.sqreen.com/?utm_source=badge">
          <Sqreen className="sqreen" />
        </a>
      </footer>
    </>
  );
}

export default LandingPage;
