import { IconChatBubble } from '../../../assets/icons';

type MessageIconBtnProps = {
  isSelf: boolean;
  onMessageIconClick: () => void;
};

const MessageIconBtn = ({
  isSelf,
  onMessageIconClick,
}: MessageIconBtnProps) => {
  return (
    <button
      onClick={onMessageIconClick}
      disabled={isSelf}
      className={`flex select-none flex-col items-center p-2 ${
        isSelf ? 'text-silvergrey-800' : 'cursor-pointer'
      }`}
    >
      <IconChatBubble className="h-7 w-7" />
      <div
        className={`mt-0.5 ${
          isSelf ? 'text-silvergrey-800' : 'text-silvergrey-400'
        }`}
      >
        Message
      </div>
    </button>
  );
};

export default MessageIconBtn;
