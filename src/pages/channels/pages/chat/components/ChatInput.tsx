import { useCallback, useEffect, useRef, useState } from 'react';
import { IconPaperAirplane } from '../../../../../assets/icons';
import { useSidebarIsOpen } from '../../../../../contexts/sidebar/SidebarContext';

type ChatInputProps = {
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  disabled?: boolean;
};

const BASE_INPUT_HEIGHT = 24;
const MAXIMUM_LINEFEED = 12;

const ChatInput = ({
  placeholder,
  className,
  onChange,
  onEnter,
  value,
  disabled,
}: ChatInputProps) => {
  const isSidebarOpen = useSidebarIsOpen();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(0);
  const [reachedMax, setReachedMax] = useState(false);

  const handleResize = useCallback(() => {
    const scrollHeight = textAreaRef.current?.scrollHeight;
    if (!scrollHeight) return;

    const maxHeight = BASE_INPUT_HEIGHT * MAXIMUM_LINEFEED;
    if (scrollHeight >= maxHeight) {
      setHeight(maxHeight);
      setReachedMax(true);
      return;
    }

    setHeight(scrollHeight);
    setReachedMax(false);
  }, []);

  useEffect(() => {
    setHeight(textAreaRef.current?.scrollHeight ?? BASE_INPUT_HEIGHT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = () => {
    if (value === '') return;

    onEnter?.();
  };

  return (
    <form
      onSubmit={(e) => {
        handleSend();
        e.preventDefault();
      }}
      className={`md-w-sidebar fixed -bottom-[1px] right-0 w-full bg-background-300 p-4 pt-0 ${
        className ?? ''
      } ${isSidebarOpen ? '!-right-80 !left-80' : ''}`}
    >
      <div className="flex gap-1 rounded bg-background-100 py-2 pl-4 pr-1 shadow-sm">
        <div style={{ height: `${height}px` }} className="relative flex-1">
          <textarea
            style={{ height: `${height}px` }}
            className={`${
              reachedMax ? 'overflow-auto' : 'overflow-hidden'
            } text-area w-full resize-none bg-transparent pr-10 outline-none placeholder:text-silvergrey-600`}
            value={value ?? ''}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyUp={() => handleResize()}
            placeholder={placeholder ?? ''}
            disabled={disabled}
            onKeyDown={(e) => {
              if (!e.shiftKey && e.key === 'Enter') {
                handleSend();
                e.preventDefault();
              }
            }}
          />
          <textarea
            ref={textAreaRef}
            className="text-area pointer-events-none absolute left-0 right-0 top-0 h-6 resize-none bg-transparent pr-10 opacity-0 outline-none"
            value={value ?? ''}
            disabled
          />

          <div className="absolute right-2 top-0">
            <button className="h-6">
              <IconPaperAirplane className="h-6 w-6 text-warmblue-100" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
