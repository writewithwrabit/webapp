import Link from 'next/link';
import { useStoreState } from 'easy-peasy';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import NavItem from './NavItem';
import SettingsMenu from './SettingsMenu';
  
const Header = () => {
  useGoogleAnalytics();

  const user = useStoreState(state => state.user);

  return (
    <div className="border-b-2 border-primary pt-4 mb-4 bg-gray-800">
      <div className="container mx-auto nav flex text-white">
        <div className="pb-4 w-1/3">
          <Link href="/">
            <a className="font-extrabold">
              🐇wrabit
            </a>
          </Link>
        </div>

        <div className="w-1/3 text-center">
          {
            user.isAuthenticated
              ? (
                <span>
                  <NavItem url="/entries" text="Entries" />

                  <NavItem url="/write" text="Write" />

                  <NavItem url="/stats" text="Stats" />
                </span>
              )
              : ''
          }
        </div>

        <div className="w-1/3  text-right">
          <span className="nav-item pb-4">
            {
              user.isAuthenticated
                ? <SettingsMenu />
                : (
                  <Link href="/login">
                    <a className="px-8">Login</a>
                  </Link>
                )
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
