import { format } from 'date-fns';
import IMessage from '../../../../../types/message/Message';
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';

// Offset to make sure the user is
// scrolled at the bottom of the screen
// (Usually works without but better be safe than sorry)
const HEIGHT_SENSITIVITY = 2;

type ChatMessagesListProps = {
  messages: IMessage[];
};

const ChatMessagesList = ({ messages }: ChatMessagesListProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastItemRef = useRef<HTMLLIElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  let currentDateString = '';

  useEffect(() => {
    if (messages.length === 0) return;
    if (isFirstLoad) {
      endRef.current?.scrollIntoView({ behavior: 'auto' });
      setIsFirstLoad(false);
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
      window.scrollBy(0, lastItemHeight);
    }
  }, [messages, isFirstLoad]);

  return (
    <>
      <ul ref={listRef} className="relative mb-14">
        {messages.map((message) => {
          const dateString = message.timestamp
            ? format(message.timestamp?.toDate(), 'PP')
            : '';
          let dateHeader: ReactNode = null;

          if (dateString !== '' && dateString !== currentDateString) {
            currentDateString = dateString;
            dateHeader = (
              <li className="my-2.5 flex items-center gap-2">
                <div className="flex-1 border-b border-silvergrey-800" />
                <div className="text-xs font-semibold text-silvergrey-400">
                  {currentDateString}
                </div>
                <div className="flex-1 border-b border-silvergrey-800" />
              </li>
            );
          }

          return (
            <Fragment key={message.id}>
              {dateHeader}
              <ChatMessage ref={lastItemRef} message={message} />
            </Fragment>
          );
        })}
      </ul>
      <div ref={endRef} />
    </>
  );
};

export default ChatMessagesList;
