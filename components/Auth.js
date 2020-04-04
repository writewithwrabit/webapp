import { useRouter } from 'next/router';
import { useStoreState, useStoreActions } from 'easy-peasy';
import firebase from '../firebase';
import { addDays, isPast, fromUnixTime } from 'date-fns';

import GlobalLoader from './GlobalLoader';

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

    // Add email to crisp for context
    if (firebaseUser && firebaseUser.email && $crisp) {
      $crisp.push(['set', 'user:email', firebaseUser.email]);
    }

    // Redirect to the login page if a user is not allowed
    if (!firebaseUser && protectedRoutes.includes(router.pathname)) {
      router.push('/login');
    }

    const needsPlan = user.createdAt && !user.subscription && isPast(addDays(new Date(user.createdAt), 30));
    const subscriptionEnded = user.subscrption && user.subscription.status === 'canceled' && isPast(fromUnixTime(user.subscription.currentPeriodEnd));
    if (router.pathname !== '/subscribe' && (needsPlan || subscriptionEnded)) {
      router.push('/subscribe?trialEnd=1');
    }
  });

  // Display empty loading state while checking
  // that the user is properly authenticated
  if (!user.isAuthenticated && protectedRoutes.includes(router.pathname)) {
    return <GlobalLoader />;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default Auth;
