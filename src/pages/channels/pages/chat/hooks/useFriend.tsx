import { getDoc } from 'firebase/firestore';
import chatDoc from '../../../../../types/chat/firebase/chatDoc';
import IUser from '../../../../../types/user/User';
import userDoc from '../../../../../types/user/firebase/userDoc';
import { useQuery } from 'react-query';

const getFriend = async (currentUser: IUser, chatId: string) => {
  const chat = (await getDoc(chatDoc(chatId))).data()!;
  const friendId = chat.participants.filter(
    (participant) => participant.userId !== currentUser.id
  )[0].userId;

  return (await getDoc(userDoc(friendId))).data()!;
};

const useFriend = (
  currentUser: IUser | undefined,
  chatId: string | undefined
) => {
  const {
    data: friend,
    isLoading,
    error,
  } = useQuery(
    ['friend', chatId],
    async () => await getFriend(currentUser!, chatId!),
    {
      enabled: !!currentUser && !!chatId,
    }
  );

  return [friend, isLoading, error] as const;
};

export default useFriend;
