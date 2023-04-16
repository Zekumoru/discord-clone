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

const ChatInput = ({
  placeholder,
  className,
  onChange,
  onEnter,
  value,
  disabled,
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
      className={`md-w-sidebar xl-w-sidebar fixed -bottom-[1px] right-0 w-full bg-background-300 p-4 pt-0 ${
        className ?? ''
      } ${isSidebarOpen ? '!-right-80 !left-80' : ''} xl:right-80`}
    >
      <div className="flex h-10 items-center gap-1 rounded bg-background-100 px-4 py-2 shadow-sm">
        <input
          className="flex-1 bg-transparent outline-none placeholder:text-silvergrey-600"
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyUp={(e) => handleKeyDown(e.code)}
          type="text"
          placeholder={placeholder ?? ''}
          disabled={disabled}
        />

        <button>
          <IconPaperAirplane className="h-6 w-6 text-warmblue-100" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
