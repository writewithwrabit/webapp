import { Suspense } from 'react';
import { useStoreState } from 'easy-peasy';

import SectionPanel from '../components/SectionPanel';
import SubscriptionSettings from '../components/SubscriptionSettings';

const AccountSettings = () => {
  const storedUser = useStoreState(state => state.user);

  return (
    <div className="w-4/5">
      <SectionPanel>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-5 tracking-wide">
          Me
        </h2>
  
        <div className="mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
            First Name
          </label>
  
          <input
            className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
            id="first-name"
            type="text"
            placeholder="First Name"
            value={storedUser.firstName || ''}
            readOnly
          />
        </div>
  
        <div className="mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
            Last Name
          </label>
  
          <input
            className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
            id="last-name"
            type="text"
            placeholder="Last Name"
            value={storedUser.lastName || ''}
            readOnly
          />
        </div>
  
        <div className="mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
            Email
          </label>
  
          <input
            className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
            id="email"
            placeholder="Email" 
            type="email"
            value={storedUser.email || ''}
            readOnly
          />
        </div>
      </SectionPanel>
  
      <SectionPanel>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-5 tracking-wide">
          Writing
        </h2>
  
        <div className="mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="writing-goal">
            Writing Goal
          </label>
  
          <input
            className="shadow-inner border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
            id="writing-goal"
            type="text"
            placeholder="Writing Goal"
            value={storedUser.wordGoal || ''}
            readOnly
          />
        </div>
      </SectionPanel>
  
      <SectionPanel>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-5 tracking-wide">
          Subscription
        </h2>

        <Suspense fallback={<div>Loading...</div>}>
          <SubscriptionSettings user={storedUser} />
        </Suspense>
      </SectionPanel>
    </div>
  );
}

export default AccountSettings;
