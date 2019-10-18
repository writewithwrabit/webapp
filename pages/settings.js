import withLayout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const Settings = () => {
  const subtitle = 'Set your writing goal, tweak your editor, and manage your account.';

  return (
    <div>
      <PageHeader title="Settings" subtitle={subtitle} />
    </div>
  );
}

export default withLayout(Settings);
