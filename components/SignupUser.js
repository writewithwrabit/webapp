import { useState } from 'react';
import Link from 'next/link';
import { graphql, commitMutation } from 'react-relay';

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

const SignupUser = ({ setUser, setStage }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Form validation!
    if (password !== passwordConfirmation) {
      console.log('Password does not match password confirmation!');
      return;
    }

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
        console.log(createUser);
        setUser({
          id: createUser.id,
          stripeId: createUser.stripeID,
          email,
          firstName,
          lastName,
          password,
        });

        setStage('plans');
      }
    });
  }

  return (
    <div className="flex justify-center p-4 pt-16">
      <div className="mr-20 max-w-md px-20 hidden md:block">
        <div className="text-5xl font-extrabold pb-8">
          wrabit
        </div>

        <div className="text-sm">
          <div className="pb-5">
            <p className="font-bold pb-2 -ml-6">✍️ Build your habit</p>
            <p>Build your writing habit by one day at a time. Set a daily goal and work your way up to it.</p>
          </div>

          <div className="pb-5">
            <p className="font-bold pb-2 -ml-6">🧠 Support mental health</p>
            <p>For every 7 day streak you maintain, we donate a dollar to mental health research.</p>
          </div>

          <div className="pb-5">
            <p className="font-bold pb-2 -ml-6">🗓️ Free for 30 days</p>
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

          <form>
            <div className="mb-4">
              <label className="hidden" htmlFor="email">
                Email
              </label>

              <input
                className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="Email" 
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)} 
              />
            </div>

            <div className="mb-4">
              <label className="hidden" htmlFor="first-name">
                First Name
              </label>

              <input
                className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="first-name"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)} 
              />
            </div>

            <div className="mb-4">
              <label className="hidden" htmlFor="last-name">
                Last Name
              </label>

              <input
                className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                id="last-name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={({ target }) => setLastName(target.value)} 
              />
            </div>

            <div className="mb-4">
              <label className="hidden" htmlFor="password">
                Password
              </label>

              <input
                className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="hidden" htmlFor="confirm-password">
                Confirm Password
              </label>

              <input
                className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={({ target }) => setPasswordConfirmation(target.value)}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={event => handleSubmit(event)}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div>
          <p className="text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupUser;
