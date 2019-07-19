import firebase from '../firebase';
import withLayout from '../components/Layout';

// const LoginWidget = dynamic(import('../components/Login'), { ssr: false });

const Login = () => {
  // firebase.auth().signInWithEmailAndPassword('anthony@amorrissound.com', 'testing').catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.log(errorCode, errorMessage);
  // });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
    } else {
      // User is signed out.
      // ...
    }
  });

  return (
    <div>

    </div>
  );
};

export default withLayout(Login);
