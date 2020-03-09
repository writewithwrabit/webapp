import { useState } from 'react';
import firebase from '../firebase';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';

const ForgotPasswordForm = ({ setForm }) => {
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    const { email } = data;

    firebase
      .auth()
      .sendPasswordResetEmail(email).then(() => {
      // Email sent.
    }).catch(({ code }) => {
      setLoading(false);

      // Don't let people know if an account doesn't exist
      if (code === 'auth/user-not-found') {
        setResetSent(true);
      } else {
        setError('reset', 'reset', `We weren't able to reset your password. Try again and if that doesn't work get in touch with us.`);
      }
    });
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="pb-5 mb-5 border-b-2 border-gray-100 text-center">
        Let's reset your password!
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
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
          <span className="tracking-wide text-primary-dark text-xs font-bold">{errors.reset && errors.reset.message}</span>
          <span className="block tracking-wide text-xs font-bold mt-2">{resetSent && `You've got email! If your account was valid you should be able to reset your password now.`}</span>
        </div>

        <div className="flex items-center md:justify-between justify-center">
          <button
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
            type="submit"
          >
            {
              loading
                ? <FaSpinner className="w-full icon-spin" />
                : 'Reset Password'
            }
          </button>

          <a className="inline-block align-baseline text-sm hidden md:block" onClick={() => setForm('login')}>
            Login
          </a>
        </div>

        <div className="text-center mt-3 md:hidden">
          <a className="text-sm" onClick={() => setForm('login')}>
            Login
          </a>
        </div>    
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
