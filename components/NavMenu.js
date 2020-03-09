import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { FaCog } from 'react-icons/fa';
import styled from '@emotion/styled'
import Link from 'next/link';

import firebase from '../firebase';

const Menu = styled.div`
  top: 34px;
  right: -12px;
  
  & a {
    color: #2d3748;

    &:hover {
      color: #FA557D;
    }
  }
`;

const ArrowBox = styled.div`
  position: relative;
  background: #ffffff;

  &:after {
    bottom: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #ffffff;
    border-width: 10px;
    margin-left: -30px;
  }
`;

const DisplayMenu = () => {
  const signOutUser = useStoreActions(actions => actions.user.signOutUser);

  const logout = () => {
    firebase.auth().signOut();
    signOutUser();
  };

  return (
    <Menu className="z-20 bg-white absolute shadow-lg rounded flex flex-col text-gray-800">
      <ArrowBox />

      <a className="px-8 py-2 text-center" onClick={logout}>Logout</a>
  
      <Link href="/settings">
        <a className="px-8 py-2">Settings</a>
      </Link>
    </Menu>
  );
}

const NavMenu = () => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="flex justify-end relative">
      <FaCog onClick={() => setDisplay(!display)} />
      
      {display && <DisplayMenu />}
    </div>
  );
}

export default NavMenu;
