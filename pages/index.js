import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import { FaLongArrowAltRight } from 'react-icons/fa';

import '../styles/landing.css';

import Logo from '../static/logos/full-color.svg';
import Icon from '../static/logos/icon.svg';

const Index = () => {
  const user = useStoreState(state => state.user);

  return (
    <div id="landing">
      <header className="bg-white">
        <div>
          <div className="boxes w-full h-full absolute">
            <span className="box box-one bg-white"></span>
            <span className="box box-two bg-white"></span>
          </div>

          <div className="icon-container w-full h-full absolute overflow-hidden">
            <Icon className="icon" />
            <span className="box box-three"></span>
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
              Wrabit helps you build a daily writing habit, one small step at a time. Join a community of journallers as you develop your habit and contribute to mental health research. 
            </p>
  
            <button className="mt-16 text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Start writing
            </button>
          </div>
        </div>
      </header>
  
      <section className="bg-gray-800">
        SECTION ONE
      </section>
  
      <footer>
        <div className="container mx-auto">
          <a title="Realtime application protection" href="https://www.sqreen.com/?utm_source=badge">
            <img style={{ width: 109, height: 36 }} src="https://s3-eu-west-1.amazonaws.com/sqreen-assets/badges/20171107/sqreen-mono-badge.svg" alt="Sqreen | Runtime Application Protection" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
