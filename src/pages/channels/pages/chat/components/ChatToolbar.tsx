import { ReactNode } from 'react';
import { IconUsers } from '../../../../../assets/icons';
import Toolbar from '../../../components/Toolbar';

type ChatToolbarProps = {
  children?: ReactNode;
  prefix?: ReactNode;
  onMembersSlide?: () => void;
};

const ChatToolbar = ({
  onMembersSlide,
  children,
  prefix,
}: ChatToolbarProps) => {
  return (
    <Toolbar
      className="xl-w-sidebar"
      buttons={
        <div className="xl:hidden" onClick={onMembersSlide}>
          <IconUsers className="h-6 w-6" />
        </div>
      }
      prefix={prefix}
    >
      {children}
    </Toolbar>
  );
};

export default ChatToolbar;
