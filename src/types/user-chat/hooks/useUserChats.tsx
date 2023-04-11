import { useQuery } from 'react-query';
import userChatsDoc from '../firebase/userChatsDoc';
import { getDoc } from 'firebase/firestore';

const getUserChats = async (userChatsId: string | undefined) => {
  if (userChatsId === undefined) return;

  const userChatsRef = userChatsDoc(userChatsId);
  return (await getDoc(userChatsRef)).data();
};

const useUserChats = (userChatsId: string | undefined) => {
  const {
    data: userChat,
    isLoading,
    error,
  } = useQuery(
    ['user-chats', userChatsId],
    async () => await getUserChats(userChatsId),
    {
      enabled: !!userChatsId,
      refetchOnWindowFocus: false,
    }
  );

  return [userChat, isLoading, error] as const;
};

export default useUserChats;
