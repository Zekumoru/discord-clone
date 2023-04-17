import { ReactNode } from 'react';
import { IconUsers } from '../../../../../assets/icons';
import Toolbar from '../../../components/Toolbar';

type ChatToolbarProps = {
  children?: ReactNode;
  prefix?: '@' | '#';
  onOpenMembersSlider: () => void;
};

const ChatToolbar = ({
  prefix,
  children,
  onOpenMembersSlider,
}: ChatToolbarProps) => {
  let prefixElement: ReactNode = null;

  if (prefix === '@') {
    prefixElement = <span className="text-silvergrey-400">@</span>;
  }

  if (prefix === '#') {
    prefixElement = (
      <span className="relative top-[1px] ml-2 mr-1 text-xl font-medium text-silvergrey-400">
        #
      </span>
    );
  }

  return (
    <Toolbar
      className="xl-w-sidebar"
      prefix={prefixElement}
      buttons={
        <div className="xl:hidden" onClick={onOpenMembersSlider}>
          <IconUsers className="h-6 w-6" />
        </div>
      }
    >
      {children}
    </Toolbar>
  );
};

export default ChatToolbar;
