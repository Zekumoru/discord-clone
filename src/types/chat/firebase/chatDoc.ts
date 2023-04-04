import createDoc from '../../../utils/firebase/createDoc';
import IChat from '../Chat';

const chatDoc = (id: string) => {
  return createDoc<IChat>(`chats/${id}`);
};

export default chatDoc;
