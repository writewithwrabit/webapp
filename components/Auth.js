import Router from 'next/router';
import { useStoreState } from 'easy-peasy';

const protectedRoutes = ['/write'];

const Auth = ({children}) => {
  const user = useStoreState(state => state.user);

  // Redirect to the login page if a user is not allowed
  const isAllowed = url => {
    if (!user.isAuthenticated && protectedRoutes.includes(url)) {
      Router.push('/login');
    }
  }

  isAllowed(Router.pathname);

  return (
    <div>
      {children}
    </div>
  );
};

export default Auth;
