import { useState } from 'react';
import firebase from '../firebase';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';

const LoginForm = ({ setForm }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    const { email, password } = data;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        setLoading(false);
        setError('login', 'login', `We weren't able to log you in. Try again and if that doesn't work you could try resetting your password.`);
    });
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="pb-5 mb-5 border-b-2 border-gray-100 text-center">
        Welcome back!
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="hidden" htmlFor="email">
            Email
          </label>

          <input 
            className={`shadow-inner border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline ${errors.email && 'border-primary-dark'}`}
            id="username"
            placeholder="Email"
            type="email"
            name="email"
            ref={register({
              required: 'Please enter your email',
              pattern: {
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: `The email you entered doesn't seem to be valid`,
              },
            })}
          />
          <span className="tracking-wide text-primary-dark text-xs font-bold">{errors.email && errors.email.message}</span>
        </div>

        <div className="mb-8">
          <label className="hidden" htmlFor="password">
            Password
          </label>

          <input
            className={`shadow-inner border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.password && 'border-primary-dark'}`}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            ref={register({
              required: 'Please enter a password',
            })}
          />
          <span className="tracking-wide text-primary-dark text-xs font-bold">{errors.password && errors.password.message}</span>
          <span className="tracking-wide text-primary-dark text-xs font-bold">{errors.login && errors.login.message}</span>
        </div>

        <div className="flex items-center md:justify-between justify-center">
          <button
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
            type="submit"
          >
            {
              loading
                ? <FaSpinner className="w-full icon-spin" />
                : 'Login'
            }
          </button>

          <a className="inline-block align-baseline text-sm hidden md:block" onClick={() => setForm('forgotPassword')}>
            Forgot your password?
          </a>
        </div>

        <div className="text-center mt-3 md:hidden">
          <a className="text-sm" onClick={() => setForm('forgotPassword')}>
            Forgot your password?
          </a>
        </div>    
      </form>
    </div>
  );
}

export default LoginForm;
