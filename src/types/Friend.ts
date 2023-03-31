interface IFriend {
  userId: string;
  chatId: string;
}

interface IFriends {
  id: string;
  userId: string;
  friendsList: IFriend[];
}

interface IFriendRequests {
  id: string;
  userId: string;
  requests: IFriend[];
}

export default IFriend;
export type { IFriends, IFriendRequests };
