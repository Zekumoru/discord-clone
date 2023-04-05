import createDoc from '../../../utils/firebase/createDoc';
import IUserChats from '../userChat';

const userChatsDoc = (id: string) => {
  return createDoc<IUserChats>(`user-chats/${id}`);
};

export default userChatsDoc;
