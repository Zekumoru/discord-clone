import { doc, getFirestore } from 'firebase/firestore';
import performBatch from '../../../../utils/performBatch';
import snowflakeId from '../../../../utils/snowflake-id/snowflakeId';
import { IFriendRequests, IFriends } from '../../../../types/friend/Friend';
import { IUserGuilds } from '../../../../types/guild/Guild';
import IUser from '../../../../types/user/User';
import { User } from 'firebase/auth';

const createUserCollections = async (user: User, username: string) => {
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
      pictureUrl: null,
      username,
      friendsId,
      friendRequestsId,
      guildsId,
    } as IUser);
  });
};

export default createUserCollections;
