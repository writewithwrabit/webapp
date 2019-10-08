import { useState } from 'react';
import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import { FaLongArrowAltRight } from 'react-icons/fa';

import '../styles/landing.css';

import Logo from '../static/logos/full-color.svg';
import Icon from '../static/logos/icon.svg';

import Writing from '../static/writing.svg';
import Calendar from '../static/calendar.svg';
import Tangled from '../static/tangled.svg';

import EditorOne from '../static/editor-one.svg';
import EditorTwo from '../static/editor-two.svg';
import EditorThree from '../static/editor-three.svg';

import Sqreen from '../static/sqreen-mono-badge.svg';

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
  const user = useStoreState(state => state.user);
  const [editorIndex, setEditorIndex] = useState(0);
  const Editor = editors[editorIndex].component;
  const editorViewBox = editors[editorIndex].viewBox;

  setTimeout(() => {
    setEditorIndex((editorIndex + 1) % editors.length);
  }, 2000);

  return (
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
          <div className="py-10 flex justify-between">
            <Logo className="w-32" />
  
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
          </div>
  
          <div className="w-3/5 content text-white">
            <h1 className="text-6xl font-bold">
              Write your way to health
            </h1>
            
            <p className="text-2xl mt-5">
              Wrabit helps you build a daily writing habit, one small step at a time. Join a community of others as you develop a healthier relatonship with yourself. 
            </p>
  
            <button className="mt-16 text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Start your writing journey
            </button>
          </div>
        </div>
      </header>
  
      <section className="platform-description relative pb-64">
        <div className="container mx-auto px-40">
          <div>
            <p>
              We believe that journalling is for everyone. It has been shown to provide many benfits; from developing mindfulness to sparking creativity. Wrabit's simplistic editor stays out of your way and let's you focus on the writing. With nobody watching, you can proudly express your unedited self.
            </p>

            <div>
              <Writing />
            </div>
          </div>

          <div>
            <div>
              <Calendar />
            </div>

            <p>
            Building a habit is difficult. We help you succeed by starting small. On day one you aim to write a fraction of your ultimate goal. Your daily goal increases as you continue to hit your target. The more you write with Wrabit, the more we will donate towards mental health research. 
            </p>
          </div>

          <div>
            <p>
              Nearly one in five of us struggle with mental health. Although journalling will not solve all of our struggles, it can positively effect our daily life. At Wrabit, we've had our fair share of difficulties too. That's why we donate portions of your membership fees to the Brain and Behavior Research Foundation.
            </p>

            <div>
              <Tangled />
            </div>
          </div>
        </div>
      </section>

      <section className="editor relative pb-48">
        <span className="box bg-white absolute"></span>

        <div className="container mx-auto text-center flex flex-col items-center relative px-40">
          <div className="editor-svg">
            <Editor viewBox={editorViewBox} />
          </div>

          <p>
            Our editor was designed to be clean and simple. We want to stay out of your way but we have some tools to help you succeed. Format your entries, track your progress, and use a writing prompt if you feel stuck.
          </p>

          <div className="flex items-center mt-10">
            <p className="font-bold text-2xl mr-4">
              Ready to start writing?
            </p>

            <button className="ml-4 text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create your Wrabit account
            </button>
          </div>
        </div>
      </section>
  
      <footer className="relative mt-64">
        <span className="box bg-black absolute"></span>

        <div className="relative container mx-auto flex items-center flex-col">
          <div className="w-full flex justify-between pb-20">
            <a>About</a>
            <a>Contact</a>
            <a>Privacy Policy</a>
            <a>Terms of Service</a>
          </div>

          <a title="Realtime application protection" href="https://www.sqreen.com/?utm_source=badge">
            <Sqreen className="sqreen" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
