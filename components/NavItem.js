import Link from 'next/link';
import { useRouter } from 'next/router';

const NavItem = ({ url, text }) => {
  const router = useRouter();

  let classNames = 'nav-item pb-4';

  if (router.pathname === url) {
    classNames = `${classNames} active`;
  }

  return (
    <span className={classNames}>
      <Link href={url}>
        <a className="px-8">{text}</a>
      </Link>
    </span>
  );
};

export default NavItem;
