import { useState, Suspense } from 'react';

import withLayout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import SettingsMenu from '../components/SettingsMenu';
import AccountSettings from '../components/AccountSettings';
import EditorSettings from '../components/EditorSettings';
import NotificationsSettings from '../components/NotificationsSettings';

const settingsComponents = {
  account: AccountSettings,
  editor: EditorSettings,
  notifications: NotificationsSettings,
};

const Settings = () => {
  const [settingsOption, setSettingsOption] = useState('account');
  const subtitle = 'Set your writing goal, tweak your editor, and manage your subscription.';
  const Component = settingsComponents[settingsOption];

  return (
    <div>
      <PageHeader title="Settings" subtitle={subtitle} />

      <div className="flex">
        <SettingsMenu selected={settingsOption} selectOption={setSettingsOption} />

        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      </div>
    </div>
  );
}

export default withLayout(Settings);
