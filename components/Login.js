import firebase from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  // signInOptions: [
  //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  // ]
};

const Login = () => (
  <div>
    Hello?
    <StyledFirebaseAuth  uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  </div>
);

export default Login;
