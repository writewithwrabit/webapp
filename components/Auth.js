import { useRouter } from 'next/router';
import { useStoreState, useStoreActions } from 'easy-peasy';
import firebase from '../firebase';

const protectedRoutes = ['/write'];

const Auth = ({children}) => {
  const router = useRouter();
  const user = useStoreState(state => state.user);
  const signInUser = useStoreActions(actions => actions.user.signInUser);

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (!user.isAuthenticated && firebaseUser) {
      signInUser(firebaseUser);
      router.push('/write');
    }
  });

  // Redirect to the login page if a user is not allowed
  const isAllowed = url => {
    if (!user.isAuthenticated && protectedRoutes.includes(url)) {
      router.push('/login');
    }
  }

  isAllowed(router.pathname);

  return (
    <div>
      {children}
    </div>
  );
};

export default Auth;
