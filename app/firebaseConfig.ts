import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCzc33FDz7yE_P8wtd2WTUk0g-JaO67FgA',
  authDomain: 'fortura-57119.firebaseapp.com',
  projectId: 'fortura-57119',
  storageBucket: 'fortura-57119.firebasestorage.app',
  messagingSenderId: '674823172285',
  appId: '1:674823172285:android:ce9942680ae049c0ae87d4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
