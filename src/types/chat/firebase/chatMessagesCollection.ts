import createCollection from '../../../utils/firebase/createCollection';
import IMessage from '../../message/Message';

const chatMessagesCollection = (chatId: string) => {
  return createCollection<IMessage>(`chats/${chatId}/messages`);
};

export default chatMessagesCollection;
