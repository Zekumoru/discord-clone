/**
 * setup.ts
 *
 * THIS MUST BE IMPORTED ABOVE ALL ELSE, OTHERWISE ANY
 * OTHER IMPORTS THAT CALLS FIREBASE WILL THROW AN
 * APP/NO-OPTIONS ERROR.
 *
 */
import './initializeBeforeSetup';
import createUser from './createUser';
import findUserByFirebaseId from '../../types/user/firebase/findUserByFirebaseId';
import { User, getAuth } from 'firebase/auth';
import { getDocs } from 'firebase/firestore';
import usersCollection from '../../types/user/firebase/usersCollection';
import IUser from '../../types/user/User';

const setup = async (usernames?: string[]) => {
  const otherUsers: IUser[] = [];
  if (usernames && usernames.length !== 0) {
    const [_skipped, ...users] = await Promise.all(
      usernames.map((username, index) =>
        (async () => {
          if (index === 0) return;

          const user = await createUser(username);
          return await findUserByFirebaseId(user.uid);
        })()
      )
    );
    otherUsers.push(...(users as IUser[]));
  }

  let user: User;
  if (usernames === undefined) {
    user = await createUser('User#1234');
  } else {
    user = await createUser(usernames[0]);
  }

  return [await findUserByFirebaseId(user.uid), ...otherUsers] as IUser[];
};

export default setup;
