import { useRouter } from 'next/router';
import { useStoreState } from 'easy-peasy';

const Auth = ({children}) => {
    const user = useStoreState(state => state.user);
    if (!user) {
      const router = useRouter();
      router.push('/login');
    }

    return (
      <div>
        {children}
      </div>
    );
};

export default Auth;
