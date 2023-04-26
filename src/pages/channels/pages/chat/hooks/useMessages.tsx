import { useEffect, useRef, useState } from 'react';
import IMessage from '../../../../../types/message/Message';
import chatMessagesCollection from '../../../../../types/chat/firebase/chatMessagesCollection';
import { Unsubscribe } from 'firebase/auth';
import {
  QueryDocumentSnapshot,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import channelMessagesCollection from '../../../../../types/channel/firebase/channelMessagesCollection';

const MESSAGES_PER_PAGINATION = 25;

const useMessages = (type: 'chat' | 'channel', id: string | undefined) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isEndOfChat, setIsEndOfChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<unknown>();
  const queriedRef = useRef({
    oldMessages: [] as IMessage[],
    lastSnapshot: null as QueryDocumentSnapshot<IMessage> | null,
    isFetching: true,
  });

  const getMessagesRef = () => {
    if (!id) return null;

    return type === 'chat'
      ? chatMessagesCollection(id)
      : channelMessagesCollection(id);
  };

  const loadMoreMessages = async () => {
    if (isEndOfChat) return;

    const queried = queriedRef.current;
    if (queried.isFetching) return;

    const messagesRef = getMessagesRef();
    if (!messagesRef) return;

    queried.isFetching = true;
    setIsFetching(true);
    const messagesQueryRef = query(
      messagesRef,
      orderBy('timestamp', 'desc'),
      startAfter(queried.lastSnapshot),
      limit(MESSAGES_PER_PAGINATION)
    );

    const snapshots = await getDocs(messagesQueryRef);

    const oldMessages = snapshots.docs.map((doc) => doc.data()).reverse();
    setMessages((messages) => {
      queried.oldMessages = [...oldMessages, ...messages];
      queried.lastSnapshot = snapshots.docs[snapshots.docs.length - 1];
      queried.isFetching = false;
      setIsFetching(false);

      if (oldMessages.length < 25) {
        setIsEndOfChat(true);
      }

      return queried.oldMessages;
    });
  };

  useEffect(() => {
    const messagesRef = getMessagesRef();
    if (!messagesRef) return;

    const now = new Date();
    const queried = queriedRef.current;

    const loadFirstMessages = (async () => {
      const firstMessagesQueryRef = query(
        messagesRef,
        where('timestamp', '<', now),
        orderBy('timestamp', 'desc'),
        limit(MESSAGES_PER_PAGINATION)
      );

      const snapshots = await getDocs(firstMessagesQueryRef);

      const messages = snapshots.docs.map((doc) => doc.data()).reverse();
      queried.oldMessages = messages;
      queried.lastSnapshot = snapshots.docs[snapshots.docs.length - 1];
      queried.isFetching = false;
      setMessages(messages);
      setIsLoading(false);
      setIsFetching(false);

      if (messages.length < MESSAGES_PER_PAGINATION) {
        setIsEndOfChat(true);
      }

      return messages;
    })();

    let unsubscribe: Unsubscribe = () => {};
    const messagesQueryRef = query(messagesRef, where('timestamp', '>=', now));

    try {
      setError(undefined);
      unsubscribe = onSnapshot(messagesQueryRef, (snapshot) => {
        snapshot.docChanges().forEach(async (docChange) => {
          if (docChange.doc.data().timestamp === null) return;
          await loadFirstMessages;

          const messages = snapshot.docs.map((doc) => doc.data());
          setMessages([...queried.oldMessages, ...messages]);
        });
      });
    } catch (error) {
      unsubscribe();
      setError(error);
    }

    return unsubscribe;
  }, [id]);

  return {
    messages,
    loadMoreMessages,
    isEndOfChat,
    isLoading,
    isFetching,
    error,
  };
};

export default useMessages;
