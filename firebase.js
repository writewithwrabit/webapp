import * as firebase from "firebase/app";
import "firebase/auth"

const config = {
  name: 'wrabit-webapp',
  apiKey: "AIzaSyD8oE6wim8fdgXW1kg4zFPdwVsqtUdN7Y4",
  authDomain: "wrabit-webapp.firebaseapp.com",
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
  