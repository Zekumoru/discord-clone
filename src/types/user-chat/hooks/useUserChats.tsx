import { useQuery } from 'react-query';
import userChatsDoc from '../firebase/userChatsDoc';
import { getDoc } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { queryClient } from '../../../components/QueryClientInitializer';

const getUserChats = async (userChatsId: string | undefined) => {
  if (userChatsId === undefined) return;

  const userChatsRef = userChatsDoc(userChatsId);
  return (await getDoc(userChatsRef)).data();
};

const useUserChats = (userChatsId: string | undefined) => {
  const triesRef = useRef(-1);
  const {
    data: userChat,
    isLoading,
    error,
  } = useQuery(
    ['user-chats', userChatsId],
    async () => {
      triesRef.current += 0;
      return await getUserChats(userChatsId);
    },
    {
      enabled: !!userChatsId,
    }
  );

  useEffect(() => {
    if (userChat !== undefined) return;

    if (triesRef.current >= 0 && triesRef.current <= 3) {
      queryClient.invalidateQueries(['user-chats', userChatsId]);
    }
  }, [userChat]);

  return [userChat, isLoading, error] as const;
};

export default useUserChats;
