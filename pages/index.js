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
const heroTextTranslation = (x, y) => `translate3d(${x / 20}px,${y / 20}px, 0)`;

const LandingPage = () => {
  useGoogleAnalytics();

  const user = useStoreState(state => state.user);

  const [heroTextProps, setHeroTextProps] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
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
  const SectionOne = styled.section`
    margin-top: 112px;
  `;

  // React Spring scroll function
  const handleScroll = useCallback(e => {
    setEditorProps({ top: window.scrollY / 2 * -1 });
  }, []);

  const handleResize = useCallback(e => {
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

      <header className="mx-auto relative px-4 md:px-20">
        <nav id="nav" className="py-6 md:py-10 flex justify-between items-center">
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
        onMouseMove={({ clientX: x, clientY: y }) => setHeroTextProps({ xy: calc(x, y) })}
      >
        <animated.div style={{ transform: heroTextProps.xy.interpolate(heroTextTranslation) }}>
          <Typical
            className="typical text-white text-6xl"
            steps={[
              'write yourself to', 1000,
              'write yourself to health', 1500,
              'write yourself to happiness', 1500,
              'write yourself to calm', 1500,
              'write yourself to gratitude', 1500,
              'write yourself to pride', 1500,
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

      <footer className="container mx-auto relative"></footer>
    </>
  );
}

export default LandingPage;
