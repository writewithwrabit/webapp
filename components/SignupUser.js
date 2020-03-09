import { useState } from 'react';
import Link from 'next/link';
import { graphql, commitMutation } from 'react-relay';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useStoreActions } from 'easy-peasy';

import createRelayEnvironment from '../lib/relay/createRelayEnvironment';
const environment = createRelayEnvironment();

const CREATE_USER = graphql`
  mutation SignupUserQuery($input: NewUser!) {
    createUser(input: $input) {
      id
      stripeID
    }
  }
`;

import Brand from '../public/logos/name.svg';

const Logo = styled.a`
  & svg {
    width: 60%;
  }
`;

const SignupUser = () => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordErrorCount, setPasswordErrorCount] = useState(0);
  const { register, handleSubmit, errors, watch } = useForm();
  const completeUserSignup = useStoreActions(actions => actions.user.completeUserSignup);

  if (errors.password && errors.password.message !== passwordError) {
    setPasswordError(errors.password.message);
    setPasswordErrorCount(passwordErrorCount + 1);
  }

  const onSubmit = async (data) => {
    setLoading(true);
    
    const { email, firstName, lastName, password } = data;

    commitMutation(environment, {
      mutation: CREATE_USER,
      variables: {
        input: {
          firstName,
          lastName,
          email,
        }
      },
      onCompleted: ({ createUser }) => {
        completeUserSignup({
          id: createUser.id,
          stripeId: createUser.stripeID,
          email,
          firstName,
          lastName,
          password,
        });
      }
    });
  }

  return (
    <div className="flex justify-center p-4 pt-16">
      <div className="mr-20 max-w-md px-20 hidden md:block">
        <div className="pb-8">
          <Link href="/">
            <Logo>
              <Brand />
            </Logo>
          </Link>
        </div>

        <div className="text-sm">
          <div className="pb-5">
            <p className="font-bold pb-2 -ml-6 text-secondary">✍️ Build your habit</p>
            <p>Build your writing habit by one day at a time. Set a daily goal and work your way up to it.</p>
          </div>

          <div className="pb-5">
            <p className="font-bold pb-2 -ml-6 text-secondary">🧠 Support mental health</p>
            <p>For every 7 day streak you maintain, we donate a dollar to mental health research.</p>
          </div>

          <div className="pb-5">
            <p className="font-bold pb-2 -ml-6 text-secondary">🗓️ Free for 30 days</p>
            <p>See if you like us, risk free. After 30 days, subscribe monthly for the price of a coffee.</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="text-4xl text-center font-extrabold pb-8 md:hidden">
          wrabit
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="pb-5 mb-5 border-b-2 border-gray-100 text-center">
            Create your Wrabit account now
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="hidden" htmlFor="email">
                Email
              </label>

              <input
                className={`shadow-inner border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.email && 'border-primary-dark'}`}
                id="email"
                placeholder="e.hemingway@hemingwayapp.com"
                type="email"
                name="email"
                ref={register({
                  required: 'Your email will be used to login',
                  pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: `The email you entered doesn't seem to be valid`,
                  },
                })}
              />
              <span className="tracking-wide text-primary-dark text-xs font-bold">{errors.email && errors.email.message}</span>
            </div>

            <div className="mb-4">
              <label className="hidden" htmlFor="first-name">
                First Name
              </label>

              <input
                className={`shadow-inner border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.firstName && 'border-primary-dark'}`}
                id="first-name"
                type="text"
                placeholder="Ernest"
                name="firstName"
                ref={register({ required: 'What do your friends call you?' })}
              />
              <span className="tracking-wide text-primary-dark text-xs font-bold">{errors.firstName && errors.firstName.message}</span>
            </div>

            <div className="mb-6">
              <label className="hidden" htmlFor="last-name">
                Last Name
              </label>

              <input
                className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                id="last-name"
                type="text"
                placeholder="Hemingway"
                name="lastName"
                ref={register}
              />
            </div>

            <div className="mb-4">
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
                  required: 'For your safety, this is required to login',
                  minLength: { value: 8, message: 'It\'s best if your password is at least 8 characters long' },
                  validate: {
                    oneLowercase: password => password.match(/(?=.*[a-z])/) || 'Include at least one lowercase character',
                    oneUppercase: password => password.match(/(?=.*[A-Z])/) || 'Include at least one uppercase character',
                    oneNumber: password => password.match(/(?=.*[0-9])/) || 'Include at least one number',
                    oneSpecial: password => password.match(/(?=.[!@#\$%\^&\*])/) || 'Include at least one special character (!,@,#,$,%,^,&,*)',
                  },
                })}
              />
              <span className="tracking-wide text-primary-dark text-xs font-bold">{errors.password && errors.password.message}</span>
              <span className={`block tracking-wide text-xs font-bold ${!errors.password && 'mt-2'}`}>{passwordErrorCount > 2 && `I know it's tedious but we put security first!`}</span>
            </div>

            <div className="mb-6">
              <label className="hidden" htmlFor="confirm-password">
                Confirm Password
              </label>

              <input
                className={`shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline  ${errors.passwordConfirmation && 'border-primary-dark'}`}
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                ref={register({
                  required: 'Confirm your super secure password is correct',
                  validate: passwordConfirmation => passwordConfirmation === watch('password') || 'The confirmation password does not match your password',
                })}
              />
              <span className="tracking-wide text-primary-dark text-xs font-bold">{errors.passwordConfirmation && errors.passwordConfirmation.message}</span>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-primary w-full hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {
                  loading
                    ? <FaSpinner className="w-full icon-spin" />
                    : 'Sign Up'
                }
              </button>
            </div>
          </form>
        </div>

        <div>
          <p className="text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/login">
              <a>
                Login
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupUser;
