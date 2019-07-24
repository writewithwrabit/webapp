import withLayout from '../components/Layout';

const Index = () => (
  <div>
    Welcome to Wrabit!

    <button onClick={signUp}>
      Sign Up
    </button>
  </div>
);

export default withLayout(Index);
