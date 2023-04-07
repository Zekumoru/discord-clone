/**
 * setup.ts
 *
 * THIS MUST BE IMPORTED ABOVE ALL ELSE, OTHERWISE ANY
 * OTHER IMPORTS THAT CALLS FIREBASE WILL THROW AN
 * APP/NO-OPTIONS ERROR.
 *
 */
import './initializeBeforeSetup';
import createTestInstance, { FirebaseTestInstance } from './createTestInstance';
import createUsers from './createUsers';
import {
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import userDoc from '../../types/user/firebase/userDoc';
import { deleteDoc } from 'firebase/firestore';
import userGuilds from '../../types/user/firebase/userGuilds';
import userChatsDoc from '../../types/user-chat/firebase/userChatsDoc';
import friendsDoc from '../../types/friend/firebase/friendsDoc';
import friendRequestsDoc from '../../types/friend/firebase/friendRequestsDoc';

const firebaseTestInstances = new Map<string, FirebaseTestInstance>();

const setup = () => {
  const instance = createTestInstance();
  firebaseTestInstances.set(instance.id, instance);

  return instance;
};

const setupTest = async (
  instance: FirebaseTestInstance,
  usernames?: string[]
) => {
  return await createUsers(instance, usernames);
};

const removeTestInstance = async (instance: FirebaseTestInstance) => {
  await Promise.all(
    instance.getUsers().map(({ email, password }) =>
      (async () => {
        const { user: firebaseUser } = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        await deleteUser(firebaseUser);
      })()
    )
  );

  firebaseTestInstances.delete(instance.id);
};

export default setup;
export { setupTest, removeTestInstance };
