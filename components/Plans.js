import { useState } from 'react';

const Plans = ({ setPlan }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <div className="text-center pb-10 text-5xl font-extrabold">
        wrabit
      </div>

      <div className="flex justify-center p-4 text-center">
        <div className="w-full max-w-md mr-6 bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col justify-between items-center">
          <div className="text-3xl">
            Monthly Subscription
          </div>

          <div className="my-6">
            <div className="font-extrabold text-6xl">$6</div>
            <div className="text-gray-600">per month</div>
          </div>

          <ul>
            <li>30 day free trial</li>
            <li>Billed monthly</li>
            <li>We donate $1 per 14 day streak</li>
          </ul>

          <button className="text-blue-500 hover:text-blue-700 font-bold p-4 mt-6 rounded border-blue-500 border-2 hover:border-blue-700 focus:outline-none focus:shadow-outline w-full" type="button">
            Subscribe Monthly
          </button>
        </div>

        <div className="w-full max-w-md ml-6 bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col justify-between items-center relative">
          <div className="mx-auto w-1/4 rounded-full bg-blue-500 text-white absolute top-0 -mt-4 text-sm py-2">
            33% cheaper!
          </div>

          <div className="text-3xl">
            Yearly Subscription
          </div>

          <div className="my-6">
            <div className="font-extrabold text-6xl">$4</div>
            <div className="text-gray-600">per month</div>
          </div>

          <ul>
            <li>30 day free trial</li>
            <li>Billed yearly</li>
            <li>We donate $1 per 7 day streak</li>
          </ul>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 mt-6 rounded border-blue-500 border-2 hover:border-blue-700 focus:outline-none focus:shadow-outline w-full" type="button">
            Subscribe Yearly
          </button>
        </div>
      </div>
    </div>
  )
}

export default Plans;
