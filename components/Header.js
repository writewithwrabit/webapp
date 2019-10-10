import Link from 'next/link';
import { useStoreState, useStoreActions } from 'easy-peasy';

import firebase from '../firebase';
import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import NavItem from './NavItem';
  
const Header = () => {
  useGoogleAnalytics();

  const user = useStoreState(state => state.user);
  const signOutUser = useStoreActions(actions => actions.user.signOutUser);

  const logout = () => {
    firebase.auth().signOut();
    signOutUser();
  };

  return (
    <div className="nav my-4 border-b-2 border-gray-200 flex text-gray-600">
      <div className="pb-4 w-1/3">
        <Link href="/">
          <a className="px-8 font-extrabold">
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
              ? <a className="px-8" onClick={logout}>Logout</a>
              : (
                <Link href="/login">
                  <a className="px-8">Login</a>
                </Link>
              )
          }
        </span>
      </div>
    </div>
  );
};

export default Header;
