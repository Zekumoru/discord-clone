type ChatInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
};

const ChatInput = ({
  placeholder,
  onChange,
  onEnter,
  value,
}: ChatInputProps) => {
  const handleKeyDown = (keyCode: string) => {
    if (keyCode === 'Enter') {
      onEnter?.();
    }
  };

  return (
    <div className="fixed  bottom-0 left-0 right-0 m-4 flex flex-col justify-center rounded bg-background-100 px-4 py-2 shadow-sm">
      <input
        className="bg-transparent outline-none placeholder:text-silvergrey-600"
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyUp={(e) => handleKeyDown(e.code)}
        type="text"
        placeholder={placeholder ?? ''}
      />
    </div>
  );
};

export default ChatInput;
