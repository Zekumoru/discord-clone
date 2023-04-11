import { getDoc, setDoc } from 'firebase/firestore';
import friendsDoc from '../../../../../types/friend/firebase/friendsDoc';
import IUser from '../../../../../types/user/User';

const addFriend = async (user: IUser, otherUser: IUser) => {
  const friendsRef = friendsDoc(user.friendsId);
  const friends = (await getDoc(friendsRef)).data();

  await setDoc(friendsRef, {
    ...friends,
    friendsList: [
      {
        userId: otherUser.id,
      },
    ],
  });
};

export default addFriend;
