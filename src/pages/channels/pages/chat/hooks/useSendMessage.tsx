import { useMutation } from 'react-query';
import performBatch from '../../../../../utils/performBatch';
import chatMessageDoc from '../../../../../types/chat/firebase/chatMessageDoc';
import snowflakeId from '../../../../../utils/snowflake-id/snowflakeId';
import { serverTimestamp } from 'firebase/firestore';

type SendMessageArgs = {
  content: string;
  chatId: string;
  userId: string;
};

const sendMessage = async ({ chatId, userId, content }: SendMessageArgs) => {
  await performBatch(async (batch) => {
    // add message to chat's messages collection
    const messageId = snowflakeId();
    const messageRef = chatMessageDoc(chatId, messageId);

    batch.set(messageRef, {
      content,
      userId,
      id: messageId,
      timestamp: serverTimestamp(),
    });
  });
};

const useSendMessage = () => {
  return useMutation(sendMessage);
};

export default useSendMessage;
export { sendMessage };
