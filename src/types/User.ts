interface IUser {
  id: string;
  firebaseId: string;
  email: string;
  pictureUrl: string | null;
  username: string;
  friendsId: string;
  guildsId: string;
  friendRequestsId: string;
}

export default IUser;
