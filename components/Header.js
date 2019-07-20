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
    <div>
      <Link href="/">
        <a className="mr-16">Home</a>
      </Link>
  
      <Link href="/about">
        <a className="mr-16">About</a>
      </Link>
  
      {
        user.isAuthenticated
          ? (
            <Link href="/write">
              <a className="mr-16">Write</a>
            </Link>
          )
          : ''
      }

      {
        user.isAuthenticated
          ? <a className="mr-16" onClick={logout}>Logout</a>
          : (
            <Link href="/login">
              <a className="mr-16">Login</a>
            </Link>
          )
      }
    </div>
  );
};

export default Header;
