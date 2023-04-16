import { useQuery } from 'react-query';
import useUserChats from './useUserChats';
import IUserChats from '../userChat';
import createChat from '../utils/createChat';

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

  return await createChat(userChats.id, otherUserId);
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
