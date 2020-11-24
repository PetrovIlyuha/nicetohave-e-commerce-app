import admin from 'firebase-admin';
import { accountAccessConfig } from '../config/firebase-service-account-key.js';

export default admin.initializeApp({
  credential: admin.credential.cert(accountAccessConfig),
  databaseURL: 'https://nice-to-have-e-commerce.firebaseio.com',
});
