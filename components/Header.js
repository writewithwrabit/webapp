import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import styled from '@emotion/styled';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

import GetStats from '../queries/GetStats';

import Brand from '../public/logos/name.svg';
import NavItem from './NavItem';
import SettingsMenu from './SettingsMenu';

const navItems = [
  {
    url: '/entries',
    text: 'Entries',
    query: GetStats,
    variables: { global: false },
  },
  {
    url: '/write',
    text: 'Write',
    query: GetStats,
    variables: { global: false },
  },
  {
    url: '/stats',
    text: 'Stats',
    query: GetStats,
    variables: { global: false },
  },
];

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
              && (
                <span>
                  {
                    navItems.map(({
                      url,
                      text,
                      query,
                      variables,
                    }) => (
                      <NavItem
                        key={url}
                        url={url}
                        text={text}
                        query={query}
                        variables={variables}
                      />
                    ))
                  }
                </span>
              )
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
