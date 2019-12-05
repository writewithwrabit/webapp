import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { NextSeo } from 'next-seo';

import '../styles/landing.css';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import SEO from '../seo.config.js';

import Logo from '../public/logos/full-color.svg';
import Icon from '../public/logos/icon.svg';

import Quill from '../public/quill.svg';
import Writing from '../public/writing.svg';
import Calendar from '../public/calendar.svg';
import Tangled from '../public/tangled.svg';

import EditorOne from '../public/editor-one.svg';
import EditorTwo from '../public/editor-two.svg';
import EditorThree from '../public/editor-three.svg';

import MagicRabbit from '../public/magic-rabbit.svg';
import Sqreen from '../public/sqreen-mono-badge.svg';

const editors = [
  {
    component: EditorOne,
    viewBox: '0 0 1000 1000',
  },
  {
    component: EditorTwo,
    viewBox: '-12 2 1000 1000',
  },
  {
    component: EditorThree,
    viewBox: '-55 18 1000 1000',
  },
];

const Index = () => {
  useGoogleAnalytics();

  const user = useStoreState(state => state.user);
  const [editorIndex, setEditorIndex] = useState(0);
  const Editor = editors[editorIndex].component;
  const editorViewBox = editors[editorIndex].viewBox;

  setTimeout(() => {
    setEditorIndex((editorIndex + 1) % editors.length);
  }, 2000);

  return (
    <>
    <NextSeo {...SEO} />
    <div id="landing" className="text-lg leading-relaxed">
      <span className="section-box bg-gray-100 absolute"></span>

      <header className="bg-white">
        <div>
          <div className="boxes w-full absolute shadow-lg">
            <span className="box box-one shadow-lg bg-white"></span>
            <span className="box box-two shadow-lg bg-white"></span>
          </div>

          <div className="icon-container w-full absolute overflow-hidden">
            <Icon className="icon" />
            <span className="box box-three shadow-lg"></span>
          </div>
        </div>
  
        <div className="container mx-auto relative">
          <div className="pl-6 py-6 md:py-10 flex justify-between">
            <Logo className="w-20 md:w-32" />
  
            <div className="font-bold">
              {/* {
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
              } */}
            </div>
          </div>
  
          <div className="text-center md:text-left px-4 md:w-3/5 content text-white">
            <h1 className="text-4xl md:text-6xl font-bold">
              Write your way to health
            </h1>
            
            <p className="text-2xl mt-5">
              Wrabit helps you build a daily writing habit, one small step at a time. Join a community of others as you develop a healthier relationship with yourself. 
            </p>
  
            <button className="mt-16 text-xl bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {/* Start your writing journey */}
              <a href="https://www.producthunt.com/upcoming/wrabit">
                Get notified when we launch
              </a>
            </button>
          </div>
        </div>
      </header>
  
      <section className="platform-description relative pb-64">
        <div className="container mx-auto lg:px-40">
          <div className="py-10 text-center md:text-left flex-col md:flex-row">
            <div className="w-5/6 md:w-1/2 flex flex-col">
              <div>
                <Quill className="md:hidden"/>
              </div>

              <h2 className="w-full font-bold mb-4 text-xl text-primary">
                Express Yourself
              </h2>

              <p>
                We believe that journalling is for everyone. It has been shown to provide many benfits; from developing mindfulness to sparking creativity. Wrabit's simplistic editor stays out of your way and let's you focus on the writing. With nobody watching, you can proudly express your unedited self.
              </p>
            </div>

            <div>
              <Writing className="hidden md:block"/>
            </div>
          </div>

          <div className="py-10 text-center md:text-left flex-col md:flex-row">
            <div>
              <Calendar />
            </div>

            <div className="w-5/6 md:w-1/2 flex flex-col">
              <h2 className="w-full font-bold mb-4 text-xl text-primary">
                Start Small
              </h2>

              <p>
                Building a habit is difficult. We help you succeed by starting small. On day one you aim to write a fraction of your ultimate goal. Your daily goal increases as you continue to hit your target. The more you write with Wrabit, the more we will donate towards mental health research.
              </p>
            </div>
          </div>

          <div className="py-10 text-center md:text-left flex-col md:flex-row">
            <div className="w-5/6 md:w-1/2 flex flex-col">
              <div>
                <Tangled className="md:hidden" />
              </div>

              <h2 className="w-full font-bold mb-4 text-xl text-primary">
                Fund Research
              </h2>

              <p>
                Nearly one in five of us struggle with mental health. Although journalling will not solve all of our struggles, it can positively effect our daily life. At Wrabit, we've had our fair share of difficulties too. That's why we donate portions of your membership fees to the Brain and Behavior Research Foundation.
              </p>
            </div>

            <div>
              <Tangled className="hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      <section className="editor relative pb-48">
        <span className="box bg-white absolute"></span>

        <div className="container mx-auto text-center flex flex-col items-center relative px-8 lg:px-40">
          <div className="editor-svg">
            <Editor viewBox={editorViewBox} />
          </div>

          <p>
            Our editor was designed to be clean and simple. We want to stay out of your way but we have some tools to help you succeed. Format your entries, track your progress, and use a writing prompt if you feel stuck.
          </p>

          <div className="flex items-center mt-10">
            <p className="hidden md:block font-bold text-2xl mr-4">
              Ready to start writing?
            </p>

            <button className="ml-4 text-lg bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {/* Create your Wrabit account */}
              <a href="https://www.producthunt.com/upcoming/wrabit">
                Subscribe for updates
              </a>
            </button>
          </div>
        </div>
      </section>
  
      <footer className="relative mt-64">
        <span className="box bg-black absolute"></span>

        <div className="relative container mx-auto flex items-center flex-col">
          {/* <div className="w-full flex justify-around pb-20">
            <div className="flex flex-col">
              <span className="font-bold">Company</span>
              <a>About</a>
              <a>Contact</a>
            </div>

            <div className="flex flex-col">
              <span className="font-bold">Resources</span>
              <a>Privacy Policy</a>
              <a>Terms of Service</a>
            </div>
          </div> */}

          <MagicRabbit className="footer-image" />

          {/* <Quill className="footer-image" /> */}

          <a title="Realtime application protection" href="https://www.sqreen.com/?utm_source=badge">
            <Sqreen className="sqreen" />
          </a>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Index;
