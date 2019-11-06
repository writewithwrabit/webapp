import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import Brand from '../public/logos/name.svg';
import NavItem from './NavItem';
import SettingsMenu from './SettingsMenu';
import StatsLink from './StatsLink';

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
    <div className="border-b-4 border-primary py-4 mb-4 bg-secondary">
      <div className="container mx-auto nav flex text-white items-center">
        <div className="w-1/3">
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

                  {/* <NavItem url="/stats" text="Stats" /> */}

                  <StatsLink />
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
