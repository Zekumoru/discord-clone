import { useEffect, useState } from 'react';
import useUserChats from '../../../../../types/user-chat/hooks/useUserChats';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';

const useOwnsChat = (chatId: string | undefined) => {
  const [currentUser, currentUserLoading] = useCurrentUser();
  const [userChats, userChatsLoading] = useUserChats(currentUser?.userChatsId);
  const [ownsChat, setOwnsChat] = useState<boolean>();

  useEffect(() => {
    if (!chatId) return;
    if (!userChats) return;

    const ownsChat = userChats.chats.some((chat) => chat.chatId === chatId);
    setOwnsChat(ownsChat);
  }, [chatId, userChats]);

  return [ownsChat, currentUserLoading || userChatsLoading] as const;
};

export default useOwnsChat;
