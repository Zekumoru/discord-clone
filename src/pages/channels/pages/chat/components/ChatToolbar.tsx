import { ReactNode } from 'react';
import { IconUsers } from '../../../../../assets/icons';
import Toolbar from '../../../components/Toolbar';

type ChatToolbarProps = {
  children: ReactNode;
  onMembersSlide?: () => void;
};

const ChatToolbar = ({ onMembersSlide, children }: ChatToolbarProps) => {
  return (
    <Toolbar
      buttons={
        <div onClick={onMembersSlide}>
          <IconUsers className="h-6 w-6" />
        </div>
      }
      prefix={<span className="text-silvergrey-400">@</span>}
    >
      {children}
    </Toolbar>
  );
};

export default ChatToolbar;
