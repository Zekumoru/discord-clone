interface IUser {
  id: string;
  firebaseId: string;
  email: string;
  pictureUrl: string | null;
  name: string;
  tag: string;
  friendsId: string;
  guildsId: string;
  friendRequestsId: string;
}

export default IUser;
