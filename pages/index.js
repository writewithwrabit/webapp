import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { NextSeo } from 'next-seo';
import Typical from 'react-typical'
import styled from '@emotion/styled';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import SEO from '../seo.config.js';

import LogoIcon from '../public/logos/icon.svg';
import LogoName from '../public/logos/name.svg';
import Sqreen from '../public/sqreen-mono-badge.svg';

const LandingPage = () => {
  useGoogleAnalytics();

  const user = useStoreState(state => state.user);

  const nav = document.getElementById('nav');
  const Hero = styled.section`
    height: calc(100vh - 224px);
    @media (max-width: 640px) {
      height: 100vh;
    }
  `;

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

      <Hero className="container mx-auto relative bg-secondary flex justify-center items-center rounded-lg shadow-md px-10">
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
        <div className="bg-primary rounded-full h-20 w-20 absolute"></div>
      </Hero>

      <footer className="container mx-auto relative"></footer>
    </>
  );
}

export default LandingPage;
