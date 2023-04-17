import { ReactNode } from 'react';
import { IconUsers } from '../../../../../assets/icons';
import Toolbar from '../../../components/Toolbar';
import { useMembersSlider } from '../../../../../contexts/members-slider/MembersSliderContext';

type ChatToolbarProps = {
  children?: ReactNode;
  prefix?: ReactNode;
  onOpenMembersSlider: () => void;
};

const ChatToolbar = ({
  prefix,
  children,
  onOpenMembersSlider,
}: ChatToolbarProps) => {
  return (
    <Toolbar
      className="xl-w-sidebar"
      buttons={
        <div className="xl:hidden" onClick={onOpenMembersSlider}>
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
