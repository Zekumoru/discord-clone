import createDoc from '../../../utils/firebase/createDoc';
import IMessage from '../../message/Message';

const channelMessagesDoc = (channelId: string, messageId: string) => {
  return createDoc<IMessage>(`channels/${channelId}/messages/${messageId}`);
};

export default channelMessagesDoc;
