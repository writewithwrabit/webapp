import { useState } from 'react';
import firebase from '../firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStoreState } from 'easy-peasy';
import styled from '@emotion/styled';

import Brand from '../public/logos/name.svg';

const Logo = styled.a`
  & svg {
    margin: auto;
    width: 60%;
  }
`;

const Login = () => {
  const router = useRouter();
  const user = useStoreState(state => state.user);

  if (user.isAuthenticated) {
    router.push('/write');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error.code, error.message);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center pt-16 text-gray-800">
      <div className="pb-10">
        <Link href="/">
          <Logo>
            <Brand />
          </Logo>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="pb-5 mb-5 border-b-2 border-gray-100 text-center">
          Welcome back!
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="hidden" htmlFor="email">
              Email
            </label>

            <input 
              className="shadow-inner border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
              id="username"
              placeholder="Email"
              value={email}
              type="email"
              onChange={({ target }) => setEmail(target.value)} 
            />
          </div>

          <div className="mb-6">
            <label className="hidden" htmlFor="password">
              Password
            </label>

            <input
              className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <div className="flex items-center md:justify-between justify-center">
            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
              Login
            </button>

            <a className="inline-block align-baseline text-sm text-primary hover:text-primary-dark hidden md:block" href="#">
              Forgot your password?
            </a>
          </div>

          <div className="text-center mt-3 md:hidden">
            <a className="text-sm text-primary hover:text-primary-dark" href="#">
              Forgot your password?
            </a>
          </div>
            
        </form>
      </div>

      <p className="text-center text-sm">
        Don't have an account?&nbsp;
        <Link href="/signup">
          <a className="text-primary hover:text-primary-dark">
            Sign Up
          </a>
        </Link>
      </p>
    </div>
  );
};

export default Login;
