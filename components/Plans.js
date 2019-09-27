import { useState } from 'React';
import Payment from './Payment';

const Plans = ({ setPlan, setStage, plan }) => {
  const submitPlan = (plan) => {
    setPlan(plan);
    // setStage('payment');
  }

  return (
    <div className="flex flex-col items-center pt-16">
      <div className="text-center pb-6 text-5xl font-extrabold">
        wrabit
      </div>

      <div className="text-center mb-10 w-1/4">
        Support mental health research while building your own writing habit for <span className="font-bold">less than a quarter a day</span>!
      </div>

      <div className="flex justify-center p-4 text-center w-4/5">
        <div className="w-full max-w-md mr-6 bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col justify-between items-center">
          <div className="text-3xl">
            Monthly Subscription
          </div>

          <div className="my-6">
            <div className="font-extrabold text-6xl">$6.99</div>
            <div className="text-gray-600">per month</div>
          </div>

          <ul>
            <li>30 day free trial</li>
            <li>Billed monthly</li>
            <li>We donate $1 for every 14 day streak</li>
          </ul>

          {
            plan === 'monthly'
              ? <Payment />
              : (
                <button
                  className="text-blue-500 hover:text-blue-700 font-bold p-4 mt-6 rounded border-blue-500 border-2 hover:border-blue-700 focus:outline-none focus:shadow-outline w-full"
                  type="button"
                  onClick={() => submitPlan('monthly')}
                >
                  Subscribe Monthly
                </button>
              )
          }
        </div>

        <div className="w-full max-w-md ml-6 bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col justify-between items-center relative">
          <div className="mx-auto rounded-full bg-blue-500 text-white absolute top-0 -mt-4 text-sm py-2 px-4">
            28% cheaper
          </div>

          <div className="text-3xl">
            Yearly Subscription
          </div>

          <div className="my-6">
            <div className="font-extrabold text-6xl">$4.99</div>
            <div className="text-gray-600">per month</div>
          </div>

          <ul>
            <li>50% more social impact</li>
            <li>30 day free trial</li>
            <li>Billed yearly</li>
            <li>We donate $1 for every 7 day streak</li>
          </ul>

          {
            plan === 'yearly'
              ? <Payment />
              : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 mt-6 rounded border-blue-500 border-2 hover:border-blue-700 focus:outline-none focus:shadow-outline w-full"
                  type="button"
                  onClick={() => submitPlan('yearly')}
                >
                  Subscribe Yearly
                </button>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Plans;
