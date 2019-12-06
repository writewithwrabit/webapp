import * as firebase from "firebase/app";
import "firebase/auth";

import { stage, prod } from './firebase.config';

const config = process.env.NODE_ENV === 'production'
  ? prod
  : stage;
console.log(config, process.env.NODE_ENV);
export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
  