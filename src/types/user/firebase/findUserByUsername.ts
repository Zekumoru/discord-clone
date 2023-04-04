import { getDocs, limit, query, where } from 'firebase/firestore';
import usersCollection from './usersCollection';
import IUser from '../User';

const findUserByUsername = async (
  username: string
): Promise<IUser | undefined> => {
  const friendRef = query(
    usersCollection,
    where('username', '==', username),
    limit(1)
  );

  const foundUsers = (await getDocs(friendRef)).docs;
  if (foundUsers.length === 0) {
    return undefined;
  }

  return foundUsers[0].data();
};

export default findUserByUsername;
