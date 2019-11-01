import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import styled from '@emotion/styled';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import Brand from '../static/logos/name.svg';
import NavItem from './NavItem';
import SettingsMenu from './SettingsMenu';

const Logo = styled.a`
  & svg {
    width: 21%;
  }

  & path {
    fill: white;
  }
`;
  
const Header = () => {
  useGoogleAnalytics();

  const user = useStoreState(state => state.user);

  return (
    <div className="border-b-4 border-primary pt-4 mb-4 bg-secondary">
      <div className="container mx-auto nav flex text-white">
        <div className="pb-4 w-1/3">
          <Link href="/">
            <Logo>
              <Brand />
            </Logo>
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
              : null
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
