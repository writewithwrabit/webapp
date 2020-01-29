import { useStoreState } from 'easy-peasy';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';

import LogoName from '../public/logos/name.svg';

const Header = () => {
  const user = useStoreState(state => state.user);

  return (
    <header className="relative px-4 lg:px-20">
      <nav id="nav" className="py-6 lg:py-10 flex justify-between items-center">
        <Link href="/">
          <a>
            <LogoName className="w-24 md:w-32" />
          </a>
        </Link>

        <div className="font-bold flex items-center">
          <Link href="/pricing">
            <a className="hidden lg:block mx-8">
              Pricing
            </a>
          </Link>

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
                <button className="cta bg-primary hover:bg-primary-dark text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline">
                  <Link href="/signup">
                    <a className="text-white">
                      Start Writing
                    </a>
                  </Link>
                </button>
              )
          }
          </div>
      </nav>
    </header>
  );
}

export default Header;
