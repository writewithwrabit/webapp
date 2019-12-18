import { useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';

import SignupUser from '../components/SignupUser';

const Signup = () => {
  const router = useRouter();
  const authUser = useStoreState(state => state.user);

  if (authUser.isAuthenticated) {
    router.push('/write');
  }

  return (
    <div className="text-gray-800">
      <SignupUser />
    </div>
  );
};

export default Signup;
