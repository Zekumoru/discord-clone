import { IconPaperAirplane } from '../../../../../assets/icons';
import { useSidebarIsOpen } from '../../../../../contexts/sidebar/SidebarContext';

type ChatInputProps = {
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
};

const ChatInput = ({
  placeholder,
  className,
  onChange,
  onEnter,
  value,
}: ChatInputProps) => {
  const isSidebarOpen = useSidebarIsOpen();

  const handleSend = () => {
    if (value === '') return;

    onEnter?.();
  };

  const handleKeyDown = (keyCode: string) => {
    if (keyCode === 'Enter') {
      handleSend();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSend();
        e.preventDefault();
      }}
      className={`fixed bottom-0 left-0 right-0 m-4 flex h-10 items-center gap-1 rounded bg-background-100 px-4 py-2 shadow-sm ${
        className ?? ''
      } ${isSidebarOpen ? '!-right-80 !left-80' : ''}`}
    >
      <input
        className="flex-1 bg-transparent outline-none placeholder:text-silvergrey-600"
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyUp={(e) => handleKeyDown(e.code)}
        type="text"
        placeholder={placeholder ?? ''}
      />

      <button>
        <IconPaperAirplane className="h-6 w-6 text-warmblue-100" />
      </button>
    </form>
  );
};

export default ChatInput;
