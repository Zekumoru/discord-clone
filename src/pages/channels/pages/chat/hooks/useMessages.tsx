import { useEffect, useState } from 'react';
import IMessage from '../../../../../types/message/Message';
import chatMessagesCollection from '../../../../../types/chat/firebase/chatMessagesCollection';
import { Unsubscribe } from 'firebase/auth';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import channelMessagesCollection from '../../../../../types/channel/firebase/channelMessagesCollection';

const useMessages = (type: 'chat' | 'channel', id: string | undefined) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (!id) return;

    const messagesRef =
      type === 'chat'
        ? chatMessagesCollection(id)
        : channelMessagesCollection(id);
    const messagesQueryRef = query(messagesRef, orderBy('timestamp', 'asc'));
    let unsubscribe: Unsubscribe = () => {};

    try {
      setError(undefined);
      unsubscribe = onSnapshot(messagesQueryRef, (snapshot) => {
        snapshot.docChanges().forEach((docChange) => {
          if (docChange.doc.data().timestamp === null) return;

          const messages = snapshot.docs.map((doc) => doc.data());
          setMessages(messages);
          setIsLoading(false);
        });
      });
    } catch (error) {
      unsubscribe();
      setError(error);
    }

    return () => unsubscribe();
  }, [id]);

  return [messages, isLoading, error] as const;
};

export default useMessages;
