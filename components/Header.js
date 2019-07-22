import Link from 'next/link';
import { useStoreState, useStoreActions } from 'easy-peasy';

import firebase from '../firebase';
  
const Header = () => {
  const user = useStoreState(state => state.user);
  const signOutUser = useStoreActions(actions => actions.user.signOutUser);

  const logout = () => {
    firebase.auth().signOut();
    signOutUser();
  };

  return (
    <div className="nav mt-4 border-b-2 border-gray-200 flex text-gray-600">
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
              <span className="nav-item pb-4">
                <Link href="/write">
                  <a className="px-8">Write</a>
                </Link>
              </span>
            )
            : ''
        }
      </div>

      <div className="w-1/3  text-right">
        <span className="nav-item pb-4 px-8">
          {
            user.isAuthenticated
              ? <a onClick={logout}>Logout</a>
              : (
                <Link href="/login">
                  <a>Login</a>
                </Link>
              )
          }
        </span>
      </div>
    </div>
  );
};

export default Header;
