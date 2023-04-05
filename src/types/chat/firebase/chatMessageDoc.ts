import createDoc from '../../../utils/firebase/createDoc';
import IMessage from '../../message/Message';

const chatMessageDoc = (chatId: string, messageId: string) => {
  return createDoc<IMessage>(`chats/${chatId}/messages/${messageId}`);
};

export default chatMessageDoc;
