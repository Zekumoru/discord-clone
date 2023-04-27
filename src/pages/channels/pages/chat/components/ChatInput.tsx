import { useCallback, useEffect, useRef, useState } from 'react';
import { IconPaperAirplane } from '../../../../../assets/icons';

type ChatInputProps = {
  value?: string;
  className?: string;
  onHeightChange?: (height: number) => void;
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
  onHeightChange,
  onEnter,
  value,
  disabled,
}: ChatInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(0);
  const [reachedMax, setReachedMax] = useState(false);

  const handleResize = useCallback(() => {
    const scrollHeight = textAreaRef.current?.scrollHeight;
    if (!scrollHeight) return;

    const maxHeight = BASE_INPUT_HEIGHT * MAXIMUM_LINEFEED;
    if (scrollHeight >= maxHeight) {
      setHeight(maxHeight);
      onHeightChange?.(maxHeight - BASE_INPUT_HEIGHT);
      setReachedMax(true);
      return;
    }

    setHeight(scrollHeight);
    onHeightChange?.(scrollHeight - BASE_INPUT_HEIGHT);
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
      className={className}
      onSubmit={(e) => {
        handleSend();
        e.preventDefault();
      }}
    >
      <div className="flex gap-1 rounded bg-background-100 py-2 pl-4 pr-1 shadow-sm">
        <div style={{ height: `${height}px` }} className="relative flex-1">
          <textarea
            style={{ height: `${height}px` }}
            className={`${
              reachedMax ? 'overflow-auto' : 'overflow-hidden'
            } text-area w-full resize-none bg-transparent pr-10 outline-none placeholder:text-silvergrey-600`}
            value={value ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              onChange?.(value);

              if (!textAreaRef.current) return;
              textAreaRef.current.value = value;
              handleResize();
            }}
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
