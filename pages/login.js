import { useState } from 'react';
import firebase from '../firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStoreState, useStoreActions } from 'easy-peasy';

import withLayout from '../components/Layout';

const Login = () => {
  const router = useRouter();
  const user = useStoreState(state => state.user);
  const signInUser = useStoreActions(actions => actions.user.signInUser);

  if (user.isAuthenticated) {
    router.push('/write');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (!user.isAuthenticated && firebaseUser) {
      signInUser(firebaseUser);
      router.push('/write');
    }
  });

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
    <div className="flex flex-col justify-center items-center p-20">
      <div className="pb-10 text-5xl font-extrabold">
        🐇 wrabit
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="pb-5 mb-5 border-b-2 border-gray-100 text-center">
          Welcome back!
        </div>

        <form>
          <div className="mb-4">
            <label className="hidden" for="email">
              Email
            </label>
            <input className="shadow-inner border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" />
          </div>

          <div className="mb-6">
            <label className="hidden" for="password">
              Password
            </label>
            <input className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
          </div>

          <div className="flex items-center md:justify-between justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
            <a className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 hidden md:block" href="#">
              Forgot your password?
            </a>
          </div>

          <div className="text-center mt-3 md:hidden">
            <a className="text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot your password?
            </a>
          </div>
            
        </form>
      </div>

      <p className="text-center text-sm">
        Don't have an account?&nbsp;
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </p>
    </div>
  );
};

export default withLayout(Login);
