import { getDoc } from 'firebase/firestore';
import performBatch from '../../../utils/performBatch';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import chatDoc from '../../chat/firebase/chatDoc';
import userDoc from '../../user/firebase/userDoc';
import userChatsDoc from '../firebase/userChatsDoc';

const createChat = async (userChatsId: string, otherUserId: string) => {
  const chatId = snowflakeId();
  const userChats = (await getDoc(userChatsDoc(userChatsId))).data()!;
  const otherUser = (await getDoc(userDoc(otherUserId))).data()!;

  const userChat = userChats.chats.find(
    (userChat) => userChat.userId === otherUserId
  );

  // chat already exists
  if (userChat) {
    return userChat.chatId;
  }

  await performBatch(async (batch) => {
    const chatRef = chatDoc(chatId);
    const messagesId = snowflakeId();

    batch.set(chatRef, {
      id: chatId,
      messagesId,
      participants: [
        {
          userId: userChats.userId,
        },
        {
          userId: otherUserId,
        },
      ],
    });

    const userChatsRef = userChatsDoc(userChats.id);
    const otherUserChatsRef = userChatsDoc(otherUser.userChatsId);
    const otherUserChats = (await getDoc(otherUserChatsRef)).data()!;

    batch.set(userChatsRef, {
      ...userChats,
      chats: [
        ...userChats.chats,
        {
          chatId,
          userId: otherUserId,
        },
      ],
    });

    batch.set(otherUserChatsRef, {
      ...otherUserChats,
      chats: [
        ...otherUserChats.chats,
        {
          chatId,
          userId: userChats.userId,
        },
      ],
    });
  });

  return chatId;
};

export default createChat;
