interface IFriend {
  userId: string;
  chatId: string;
}

interface IFriends {
  id: string;
  userId: string;
  friendsList: IFriend[];
}

interface IFriendRequest {
  userId: string;
  pendingType: 'acceptance' | 'request';
}

interface IFriendRequests {
  id: string;
  userId: string;
  requests: IFriendRequest[];
}

export default IFriend;
export type { IFriends, IFriendRequest, IFriendRequests };
