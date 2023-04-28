import { format } from 'date-fns';
import IMessage from '../../../../../types/message/Message';
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import ChatMessageLoading from './ChatMessageLoading';

// Offset to make sure the user is
// scrolled at the bottom of the screen
// (Usually works without but better be safe than sorry)
const HEIGHT_SENSITIVITY = 2;

type ChatMessagesListProps = {
  id: string | undefined;
  messages: IMessage[];
  isEndOfChat: boolean;
  loadMoreMessagesFn: () => void;
};

const ChatMessagesList = ({
  id,
  messages,
  loadMoreMessagesFn,
  isEndOfChat,
}: ChatMessagesListProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const firstItemRef = useRef<HTMLLIElement>(null);
  const prevFirstItemRef = useRef({ element: null as HTMLLIElement | null });
  const lastItemRef = useRef<HTMLLIElement>(null);
  const lastLoadingItemRef = useRef<HTMLLIElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currentUser] = useCurrentUser();
  const nowRef = useRef(Date.now());
  let currentDateString = '';

  useEffect(() => {
    setIsFirstLoad(true);
  }, [id]);

  useEffect(() => {
    let firstScrolled = -1;

    const scrollListener = () => {
      if (!lastLoadingItemRef.current) return;

      const loadingStartY =
        lastLoadingItemRef.current.getBoundingClientRect().y;

      if (firstScrolled === -1 && loadingStartY > 0) {
        firstScrolled = loadingStartY;
        loadMoreMessagesFn();
      }
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, [loadMoreMessagesFn]);

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (
      isFirstLoad ||
      (lastMessage.userId === currentUser?.id &&
        lastMessage.timestamp &&
        lastMessage.timestamp.toMillis() > nowRef.current)
    ) {
      window.scrollTo(0, document.body.scrollHeight);
      setIsFirstLoad(false);
      return;
    }

    const firstItem = firstItemRef.current;
    const prevFirstItem = prevFirstItemRef.current.element;
    const lastLoadingItem = lastLoadingItemRef.current;
    if (prevFirstItem && lastLoadingItem && firstItem !== prevFirstItem) {
      window.scrollBy(0, prevFirstItem.offsetTop - lastLoadingItem.offsetTop);
      return;
    }

    if (!listRef.current || !lastItemRef.current) return;

    const { marginTop, marginBottom } = getComputedStyle(lastItemRef.current);
    const lastItemHeight =
      lastItemRef.current.clientHeight +
      parseFloat(marginTop) +
      parseFloat(marginBottom);

    const maxScrollHeight = document.body.scrollHeight - lastItemHeight;
    const currentScrollHeight =
      Math.ceil(window.innerHeight + window.scrollY) + HEIGHT_SENSITIVITY;

    if (currentScrollHeight >= maxScrollHeight) {
      window.scrollTo(0, document.body.scrollHeight);
      // window.scrollBy(0, lastItemHeight);
    }
  }, [messages, isFirstLoad]);

  return (
    <>
      <ul ref={listRef} className="relative mb-2.5">
        {!isEndOfChat &&
          Array(12)
            .fill(undefined)
            .map((_, index) => (
              <ChatMessageLoading ref={lastLoadingItemRef} key={index} />
            ))}
        {messages.map((message, index) => {
          const dateString = message.timestamp
            ? format(message.timestamp?.toDate(), 'PP')
            : '';
          let dateHeader: ReactNode = null;

          if (dateString !== '' && dateString !== currentDateString) {
            currentDateString = dateString;
            dateHeader = (
              <li className="my-2.5 flex items-center gap-2 px-4">
                <div className="flex-1 border-b border-silvergrey-800" />
                <div className="text-xs font-semibold text-silvergrey-400">
                  {currentDateString}
                </div>
                <div className="flex-1 border-b border-silvergrey-800" />
              </li>
            );
          }

          if (firstItemRef.current !== null) {
            prevFirstItemRef.current.element = firstItemRef.current;
          }

          let itemRef = index === 0 ? firstItemRef : lastItemRef;
          return (
            <Fragment key={message.id}>
              {dateHeader}
              <ChatMessage ref={itemRef} message={message} />
            </Fragment>
          );
        })}
      </ul>
      <div ref={endRef} />
    </>
  );
};

export default ChatMessagesList;
