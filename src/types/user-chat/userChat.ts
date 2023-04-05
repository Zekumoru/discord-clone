interface IUserChat {
  userId: string;
  chatId: string;
}

interface IUserChats {
  id: string;
  userId: string;
  chats: IUserChat[];
}

export default IUserChats;
export type { IUserChat };
