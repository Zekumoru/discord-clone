import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase.config';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

initializeApp(firebaseConfig);

if (import.meta.env.VITE_EMULATORS_ENABLED === 'true') {
  connectAuthEmulator(getAuth(), 'http://localhost:3173/', {
    disableWarnings: true,
  });
  connectFirestoreEmulator(getFirestore(), 'localhost', 3174);
  connectStorageEmulator(getStorage(), 'localhost', 9199);
  console.warn('App is currently using emulators.');
}
