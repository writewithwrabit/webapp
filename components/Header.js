import Link from 'next/link';
import { useStoreState, useStoreActions } from 'easy-peasy';

import firebase from '../firebase';

const linkStyle = {
  marginRight: 15
};
  
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
        <a style={linkStyle}>Home</a>
      </Link>
  
      <Link href="/about">
        <a style={linkStyle}>About Page</a>
      </Link>
  
      {
        user.isAuthenticated
          ? (
            <Link href="/write">
              <a style={linkStyle}>Write</a>
            </Link>
          )
          : ''
      }

      {
        user.isAuthenticated
          ? <a style={linkStyle} onClick={logout}>Logout</a>
          : (
            <Link href="/login">
              <a style={linkStyle}>Login</a>
            </Link>
          )
      }
    </div>
  );
};

export default Header;
