import { useEffect, useState } from 'react';
import IMessage from '../../../../../types/message/Message';
import chatMessagesCollection from '../../../../../types/chat/firebase/chatMessagesCollection';
import { Unsubscribe } from 'firebase/auth';
import { onSnapshot, orderBy, query } from 'firebase/firestore';

const useMessages = (chatId: string | undefined) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = chatMessagesCollection(chatId);
    const messagesQueryRef = query(messagesRef, orderBy('timestamp', 'asc'));
    let unsubscribe: Unsubscribe = () => {};

    try {
      setError(undefined);
      unsubscribe = onSnapshot(messagesQueryRef, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setMessages(messages);
        setIsLoading(false);
      });
    } catch (error) {
      unsubscribe();
      setError(error);
    }

    return () => unsubscribe();
  }, [chatId]);

  return [messages, isLoading, error] as const;
};

export default useMessages;
