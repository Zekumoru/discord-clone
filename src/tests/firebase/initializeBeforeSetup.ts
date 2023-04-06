import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase.config';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

initializeApp(firebaseConfig);
connectFirestoreEmulator(getFirestore(), 'localhost', 3174);
connectAuthEmulator(getAuth(), 'http://localhost:3173', {
  disableWarnings: true,
});
