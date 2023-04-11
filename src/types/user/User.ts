import { Timestamp } from 'firebase/firestore';

interface IUser {
  id: string;
  firebaseId: string;
  email: string;
  pictureUrl: string | null;
  username: string;
  userChatsId: string;
  friendsId: string;
  guildsId: string;
  friendRequestsId: string;
  creationTimestamp: Timestamp;
}

export default IUser;
