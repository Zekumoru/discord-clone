import { Timestamp, serverTimestamp } from 'firebase/firestore';
import performBatch from '../../../../utils/performBatch';
import snowflakeId from '../../../../utils/snowflake-id/snowflakeId';
import IUser from '../../../../types/user/User';
import { User } from 'firebase/auth';
import userChatsDoc from '../../../../types/user-chat/firebase/userChatsDoc';
import friendsDoc from '../../../../types/friend/firebase/friendsDoc';
import friendRequestsDoc from '../../../../types/friend/firebase/friendRequestsDoc';
import userGuildsDoc from '../../../../types/user/firebase/userGuildsDoc';
import userDoc from '../../../../types/user/firebase/userDoc';

const initUserCollections = async (firebaseUser: User, username: string) => {
  let user: IUser;

  await performBatch((batch) => {
    const userId = snowflakeId();

    const userChatsId = snowflakeId();
    batch.set(userChatsDoc(userChatsId), {
      userId,
      id: userChatsId,
      chats: [],
    });

    const friendsId = snowflakeId();
    batch.set(friendsDoc(friendsId), {
      userId,
      id: friendsId,
      friendsList: [],
    });

    const friendRequestsId = snowflakeId();
    batch.set(friendRequestsDoc(friendRequestsId), {
      userId,
      id: friendRequestsId,
      requests: [],
    });

    const guildsId = snowflakeId();
    batch.set(userGuildsDoc(guildsId), {
      userId,
      id: guildsId,
      guildsList: [],
    });

    user = {
      id: userId,
      email: firebaseUser.email!,
      firebaseId: firebaseUser.uid,
      pictureUrl: null,
      bannerUrl: null,
      creationTimestamp: serverTimestamp() as Timestamp,
      userChatsId,
      username,
      friendsId,
      friendRequestsId,
      guildsId,
    };
    batch.set(userDoc(userId), user);
  });

  return user!;
};

export default initUserCollections;
