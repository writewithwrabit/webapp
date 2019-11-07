import { useTransition } from 'react';
import { useRouter } from 'next/router';
import { preloadQuery } from 'react-relay/hooks';
import { useStoreActions } from 'easy-peasy';

import createRelayEnvironment from '../lib/relay/createRelayEnvironment';
const environment = createRelayEnvironment();

const NavItem = ({ url, text, query, variables }) => {
  const router = useRouter();
  const setPreloadedQuery = useStoreActions(actions => actions.pages.setPreloadedQuery);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000
  });

  let classNames = 'nav-item pb-4';

  if (router.pathname === url) {
    classNames = `${classNames} active`;
  }

  const preloadCode = () => {
    router.prefetch(url);
  }

  const preloadRoute = () => {
    router.prefetch(url);

    const preloadedQuery = preloadQuery(
      environment,
      query,
      variables,
    );

    setPreloadedQuery({ preloadedQuery });
  };

  return (
    <span className={classNames}>
      <a
        className="px-8"
        onClick={() => startTransition(() => router.push(url))}
        onMouseDown={preloadRoute}
        onMouseEnter={preloadCode}
      >
        {text}
      </a>
    </span>
  )
}

export default NavItem;
