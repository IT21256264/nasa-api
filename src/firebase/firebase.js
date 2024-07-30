import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBw2Gj13KGL0XvJatpYqplO4bAXeYnX0cM",
    authDomain: "nasa-api-1d77b.firebaseapp.com",
    projectId: "nasa-api-1d77b",
    storageBucket: "nasa-api-1d77b.appspot.com",
    messagingSenderId: "476396280392",
    appId: "1:476396280392:web:37a97676949588b30bd67d"
  };;

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
