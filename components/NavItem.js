import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const StyledNavItem = styled.span`
  font-weight: bold;

  &.active {
    color: #FA557D;

    a {
      color: #FA557D;

      &:before {
        transform: scaleX(1);
        visibility: visible;
      }
    }
  }

  a {
    color: #0A0A3C;
    position: relative;
    text-decoration: none;
  
    &:hover {
      cursor: pointer;
      color: #FA557D;
    }
  
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      bottom: -15px;
      left: 0;
      background-color: #FA557D;
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.3s ease-in-out 0s;
    }
  
    &:hover:before {
      visibility: visible;
      width: 100%;
      transform: scaleX(1);
    }
  }
`;

const NavItem = ({ url, text, query, variables }) => {
  const router = useRouter();

  let classNames = 'nav-item pb-4';

  if (router.pathname === url) {
    classNames = `${classNames} active`;
  }

  const preloadCode = () => {
    router.prefetch(url);
  }

  return (
    <StyledNavItem className={classNames}>
      <a
        className="px-8"
        onClick={() => router.push(url)}
        onMouseEnter={preloadCode}
      >
        {text}
      </a>
    </StyledNavItem>
  )
}

export default NavItem;
