import { doc, getFirestore } from 'firebase/firestore';
import performBatch from '../../../../utils/performBatch';
import snowflakeId from '../../../../utils/snowflake-id/snowflakeId';
import { IFriendRequests, IFriends } from '../../../../types/Friend';
import { IUserGuilds } from '../../../../types/Guild';
import IUser from '../../../../types/User';
import { User } from 'firebase/auth';
import generateTag from './generateTag';

const createUserCollections = async (user: User) => {
  await performBatch((batch) => {
    const userId = snowflakeId();

    const friendsId = snowflakeId();
    batch.set(doc(getFirestore(), `friends/${friendsId}`), {
      userId,
      id: friendsId,
      friendsList: [],
    } as IFriends);

    const friendRequestsId = snowflakeId();
    batch.set(doc(getFirestore(), `friend-requests/${friendRequestsId}`), {
      userId,
      id: friendRequestsId,
      requests: [],
    } as IFriendRequests);

    const guildsId = snowflakeId();
    batch.set(doc(getFirestore(), `user-guilds/${guildsId}`), {
      userId,
      id: guildsId,
      guildsList: [],
    } as IUserGuilds);

    batch.set(doc(getFirestore(), `users/${userId}`), {
      id: userId,
      email: user.email,
      firebaseId: user.uid,
      name: user.displayName,
      pictureUrl: null,
      tag: generateTag(),
      friendsId,
      friendRequestsId,
      guildsId,
    } as IUser);
  });
};

export default createUserCollections;
