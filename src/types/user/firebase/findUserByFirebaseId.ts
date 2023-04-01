import { getDocs, limit, query, where } from 'firebase/firestore';
import usersCollection from './usersCollection';
import IUser from '../User';

const findUserByFirebaseId = async (id: string): Promise<IUser | undefined> => {
  const friendRef = query(
    usersCollection,
    where('firebaseId', '==', id),
    limit(1)
  );

  const foundUsers = (await getDocs(friendRef)).docs;
  if (foundUsers.length === 0) {
    return undefined;
  }

  return foundUsers[0].data();
};

export default findUserByFirebaseId;
