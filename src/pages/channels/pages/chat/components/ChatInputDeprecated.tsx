import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

type ChatInputProps = {
  value?: string;
  className?: string;
  onHeightChange?: (height: number) => void;
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
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
  onKeyDown,
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
    if (!textAreaRef.current || value === undefined) return;
    textAreaRef.current.value = value;
    handleResize();
  }, [value]);

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
        {/* <MentionsInput
        
        >
          <Mention trigger="@" />
        </MentionsInput> */}
      </div>
    </form>
  );
};

export default ChatInput;
