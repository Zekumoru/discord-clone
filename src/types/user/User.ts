import { Timestamp } from 'firebase/firestore';

interface IUser {
  id: string;
  firebaseId: string;
  email: string;
  pictureUrl: string | null;
  bannerUrl: string | null;
  username: string;
  userChatsId: string;
  friendsId: string;
  guildsId: string;
  friendRequestsId: string;
  creationTimestamp: Timestamp | null;
}

export default IUser;
