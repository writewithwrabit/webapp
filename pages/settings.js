import withLayout from '../components/Layout';

const Settings = () => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800">
        Settings
      </h1>
      <p className="text-gray-700">
        Set your writing goal, tweak your editor, and manage your account.
      </p>
    </div>

  );
}

export default withLayout(Settings);
