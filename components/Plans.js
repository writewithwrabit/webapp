import { useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import Payment from './Payment';
import ChatLink from '../components/ChatLink';
import Brand from '../public/logos/name.svg';

const Logo = styled.a`
  & svg {
    margin: auto;
    width: 60%;
  }
`;

const Plans = ({ user }) => {
  const router = useRouter();
  const { query } = router;
  const [plan, setPlan] = useState('');

  const handleCompleted = () => router.push('/settings');

  return (
    <div className="flex flex-col items-center pt-16 text-gray-800">
      <div className="pb-6">
        <Link href="/">
          <Logo>
            <Brand />
          </Logo>
        </Link>
      </div>

      {
        query.trialEnd
        ? (
          <div className="text-center mx-10 mb-10 md:w-1/2 px-4 bg-secondary p-6 rounded text-white">
            <div className="font-bold">
              Oh no, your trial has ended!
            </div>

            <div>
              If you'd like to continue we ask that you subscribe to support the platform and mental health research.
            </div>

            <div>
              On the fence? <ChatLink>Let us know and we can work something out.</ChatLink>
            </div>
          </div>
        )
        : (
          <div className="text-center mb-10 md:w-1/4 px-4">
            Support mental health research while building your own writing habit for <span className="font-bold">less than a quarter a day</span>!
          </div>
        )
      }

      <div className="flex flex-col md:flex-row justify-center p-4 text-center md:w-4/5">
        <div className="w-full max-w-md md:mr-6 bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col justify-between items-center">
          <div className="my-6">
            <div className="font-extrabold text-6xl text-secondary">$6.99</div>
            <div className="text-gray-600 block uppercase tracking-wide text-xs font-bold">per month</div>
          </div>

          <ul>
            <li>30 day free trial</li>
            <li>Billed monthly</li>
            <li>We donate $1 for every 7 day streak</li>
          </ul>

          {
            plan === 'monthly'
              ? <Payment user={user} plan={process.env.MONTHLY_PLAN_ID} onCompleted={handleCompleted} />
              : (
                <button
                  className="text-primary hover:text-primary-dark font-bold p-4 mt-6 rounded border-primary border-2 hover:border-primary-dark focus:outline-none focus:shadow-outline w-full"
                  type="button"
                  onClick={() => setPlan('monthly')}
                >
                  Subscribe Monthly
                </button>
              )
          }
        </div>

        <div className="w-full max-w-md md:ml-6 mt-8 md:mt-0 bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col justify-between items-center relative">
          <div className="mx-auto rounded-full bg-primary text-white absolute top-0 -mt-4 text-sm py-2 px-4">
            28% cheaper
          </div>

          <div className="my-6">
            <div className="font-extrabold text-6xl  text-secondary">$4.99</div>
            <div className="text-gray-600 block uppercase tracking-wide text-xs font-bold">per month</div>
          </div>

          <ul>
            <li>50% more social impact</li>
            <li>30 day free trial</li>
            <li>Billed yearly</li>
            <li>We donate $1 for every 7 day streak</li>
          </ul>

          {
            plan === 'yearly'
              ? <Payment user={user} plan={process.env.YEARLY_PLAN_ID} onCompleted={handleCompleted} />
              : (
                <button
                  className="bg-primary hover:bg-primary-dark text-white font-bold p-4 mt-6 rounded border-primary border-2 hover:border-primary-dark focus:outline-none focus:shadow-outline w-full"
                  type="button"
                  onClick={() => setPlan('yearly')}
                >
                  Subscribe Yearly
                </button>
              )
          }
        </div>
      </div>

      <div className="block uppercase tracking-wide text-gray-500 text-xs font-bold mt-4 mb-4">
        all prices in US dollars
      </div>
    </div>
  )
}

export default Plans;
