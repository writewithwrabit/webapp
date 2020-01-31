import Link from 'next/link';
import { useStoreState } from 'easy-peasy';
import { startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

const timezoneOffsetHours = new Date().getTimezoneOffset();

import GetEntries from '../queries/GetEntries';
import GetEntry from '../queries/GetEntry';
import GetStats from '../queries/GetStats';

import LogoName from '../public/logos/name.svg';
import NavItem from './NavItem';
import NavMenu from './NavMenu';

const navItems = [
  {
    url: '/entries',
    text: 'Entries',
    query: GetEntries,
    variables: {
      userID: 'REPLACE_ME',
      startDate: null,
      endDate: null,
    },
  },
  {
    url: '/write',
    text: 'Write',
    query: GetEntry,
    variables: { 
      userID: 'REPLACE_ME',
      date: zonedTimeToUtc(
        startOfDay(new Date()),
        timezoneOffsetHours
      ),
    },
  },
  {
    url: '/stats',
    text: 'Stats',
    query: GetStats,
    variables: { global: false },
  },
];

const AppHeader = () => {
  useGoogleAnalytics();

  const user = useStoreState(state => state.user);

  return (
    <header className="py-6 lg:py-10 mb-4">
      <div className="px-4 lg:px-20 nav flex text-secondary items-center">
        <div className="w-1/3">
          <Link href="/">
            <a>
              <LogoName className="w-24 md:w-32" />
            </a>
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
            <NavMenu />
          </span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
