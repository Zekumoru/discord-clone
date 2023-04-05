import { getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import chatDoc from '../firebase/chatDoc';

const getChat = async (chatId: string | undefined) => {
  if (!chatId) return;

  const response = await getDoc(chatDoc(chatId));
  return response.data();
};

const useChat = (chatId: string | undefined) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery(['chat', chatId], async () => await getChat(chatId), {
    enabled: !!chatId,
    refetchOnWindowFocus: false,
  });

  return [user, isLoading, error] as const;
};

export default useChat;
