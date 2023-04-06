/**
 * setup.ts
 *
 * THIS MUST BE IMPORTED ABOVE ALL ELSE, OTHERWISE ANY
 * OTHER IMPORTS THAT CALLS FIREBASE WILL THROW AN
 * APP/NO-OPTIONS ERROR.
 *
 */
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import initUserCollections from '../../pages/authentication/pages/utils/initUserCollections';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase.config';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

initializeApp(firebaseConfig);
connectAuthEmulator(getAuth(), 'http://localhost:3173');
connectFirestoreEmulator(getFirestore(), 'localhost', 3174);

type SetupOptions = {
  email: string;
  password: string;
  username: string;
};

const defaultOptions: SetupOptions = {
  email: 'user@example.com',
  password: 'user@password',
  username: 'User#1234',
};

const setup = async ({ email, password, username } = defaultOptions) => {
  if (!email || !password || !username) {
    throw new Error('One of the setup options is missing.');
  }

  const response = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );

  await updateProfile(response.user, { displayName: username });
  await initUserCollections(response.user, username);
};

export default setup;
