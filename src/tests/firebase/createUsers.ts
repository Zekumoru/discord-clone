import IUser from '../../types/user/User';
import findUserByFirebaseId from '../../types/user/firebase/findUserByFirebaseId';
import createUser from './createUser';
import { FirebaseTestInstance } from './createTestInstance';

const createUsers = async (
  instance: FirebaseTestInstance,
  usernames?: string[]
) => {
  const otherUsers: IUser[] = [];
  if (usernames && usernames.length !== 0) {
    const [_skipped, ...users] = await Promise.all(
      usernames.map((username, index) =>
        (async () => {
          if (index === 0) return;

          const [firebaseUser, email, password] = await createUser(username);
          const user = (await findUserByFirebaseId(firebaseUser.uid))!;
          instance.addUser(user, email, password);

          return user;
        })()
      )
    );

    otherUsers.push(...(users as IUser[]));
  }

  // the first element is last because of how Firebase
  // logs in a user when created
  let createUserTuple: Awaited<ReturnType<typeof createUser>>;
  if (usernames === undefined) {
    createUserTuple = await createUser('User#1234');
  } else {
    createUserTuple = await createUser(usernames[0]);
  }

  const currentUser = (await findUserByFirebaseId(createUserTuple[0].uid))!;
  const [_, email, password] = createUserTuple;
  instance.addUser(currentUser, email, password);

  return [currentUser, ...otherUsers] as IUser[];
};

export default createUsers;
