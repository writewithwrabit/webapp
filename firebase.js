import * as firebase from "firebase/app";
import "firebase/auth"

const config = {
  apiKey: "AIzaSyD8oE6wim8fdgXW1kg4zFPdwVsqtUdN7Y4",
  authDomain: "wrabit-webapp.firebaseapp.com",
  databaseURL: "https://wrabit-webapp.firebaseio.com",
  projectId: "wrabit-webapp",
  storageBucket: "",
  messagingSenderId: "493631743586",
  appId: "1:493631743586:web:98cc1a62b1fbad9f"
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
  