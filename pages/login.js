import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStoreState } from 'easy-peasy';
import styled from '@emotion/styled';

import Brand from '../public/logos/name.svg';
import LoginForm from '../components/LoginForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const Logo = styled.a`
  & svg {
    margin: auto;
    width: 60%;
  }
`;

const formComponents = {
  login: LoginForm,
  forgotPassword: ForgotPasswordForm,
};

const Login = () => {
  const router = useRouter();
  const user = useStoreState(state => state.user);
  const [form, setForm] = useState('login');
  const Component = formComponents[form];

  if (user.isAuthenticated) {
    router.push('/write');
  }

  return (
    <div className="flex flex-col justify-center items-center pt-16 text-gray-800">
      <div className="pb-10">
        <Link href="/">
          <Logo>
            <Brand />
          </Logo>
        </Link>
      </div>

      <Component setForm={setForm} />

      <p className="text-center text-sm">
        Don't have an account?&nbsp;
        <Link href="/signup">
          <a>
            Sign Up
          </a>
        </Link>
      </p>
    </div>
  );
};

export default Login;
