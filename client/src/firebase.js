import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAlMB0N6AvPZVksRQR2FeBnpZkLLsvgUOo',
  authDomain: 'nice-to-have-e-commerce.firebaseapp.com',
  databaseURL: 'https://nice-to-have-e-commerce.firebaseio.com',
  projectId: 'nice-to-have-e-commerce',
  storageBucket: 'nice-to-have-e-commerce.appspot.com',
  messagingSenderId: '286078035849',
  appId: '1:286078035849:web:2a8f8449bf5c075f90a358',
};

firebase.initializeApp(firebaseConfig);

export const authWithFirebase = firebase.auth();
export const googleAuthProviderForFirebase = new firebase.auth.GoogleAuthProvider();
