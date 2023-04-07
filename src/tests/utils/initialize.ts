import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase.config';

initializeApp(firebaseConfig);
connectAuthEmulator(getAuth(), 'http://localhost:3173/', {
  disableWarnings: true,
});
connectFirestoreEmulator(getFirestore(), 'localhost', 3174);
