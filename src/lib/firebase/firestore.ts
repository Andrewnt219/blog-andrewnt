// Initialize Cloud Firestore through Firebase
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase-config.json';

if (getApps().length === 0)
  initializeApp(firebaseConfig);

const clientDb = getFirestore();

export default clientDb;
