import createCollection from '../../../utils/firebase/createCollection';
import IMessage from '../../message/Message';

const channelMessagesCollection = (channelId: string) => {
  return createCollection<IMessage>(`channels/${channelId}/messages`);
};

export default channelMessagesCollection;
