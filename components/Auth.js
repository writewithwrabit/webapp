import { useRouter } from 'next/router';
import { useStoreState, useStoreActions } from 'easy-peasy';
import firebase from '../firebase';

const protectedRoutes = [
  '/write',
  '/entries',
  '/stats',
  '/settings',
];

const Auth = ({ children }) => {
  const router = useRouter();
  const user = useStoreState(state => state.user);
  const signInUser = useStoreActions(actions => actions.user.signInUser);
  const getUserData = useStoreActions(actions => actions.user.getUserData);

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (!user.isAuthenticated && firebaseUser) {
      signInUser(firebaseUser);
      getUserData({ userID: firebaseUser.uid });

      router.push(router.pathname);
    }

    // Redirect to the login page if a user is not allowed
    if (!firebaseUser && protectedRoutes.includes(router.pathname)) {
      router.push('/login');
    }
  });

  // Display empty loading state while checking
  // that the user is properly authenticated
  if (!user.isAuthenticated && protectedRoutes.includes(router.pathname)) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        LOADING...	
      </div>
    );
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default Auth;
