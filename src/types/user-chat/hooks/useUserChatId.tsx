import { useQuery } from 'react-query';
import useUserChats from './useUserChats';
import IUserChats from '../userChat';
import snowflakeId from '../../../utils/snowflake-id/snowflakeId';
import performBatch from '../../../utils/performBatch';
import chatDoc from '../../chat/firebase/chatDoc';
import userChatsDoc from '../firebase/userChatsDoc';
import userDoc from '../../user/firebase/userDoc';
import { getDoc } from 'firebase/firestore';

const getUserChatId = async (
  userChats: IUserChats | undefined,
  otherUserId: string | undefined
) => {
  if (userChats === undefined || otherUserId === undefined) return;
  if (userChats.userId === otherUserId) {
    throw new Error(
      'Cannot create user chat! You cannot chat with yourself, loner.'
    );
  }

  const userChat = userChats.chats.find(
    (userChat) => userChat.userId === otherUserId
  );

  // chat already exists
  if (userChat) {
    return userChat.chatId;
  }

  // start a new chat
  const chatId = snowflakeId();
  const otherUser = (await getDoc(userDoc(otherUserId))).data()!;

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

const useUserChatId = (
  userChatsId: string | undefined,
  otherUserId: string | undefined
) => {
  const [userChats, userChatsLoading, userChatsError] =
    useUserChats(userChatsId);

  const isSelf = userChats?.userId === otherUserId;

  const {
    data: chatId,
    isLoading,
    error,
  } = useQuery(
    ['user-chat', userChats?.id, otherUserId],
    async () => await getUserChatId(userChats, otherUserId),
    {
      enabled: !!userChatsId && !!otherUserId && !isSelf,
    }
  );

  return [
    chatId,
    userChatsLoading || isLoading,
    userChatsError ?? error,
  ] as const;
};

export default useUserChatId;
