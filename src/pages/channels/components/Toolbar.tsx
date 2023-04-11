import { ReactNode } from 'react';
import IconBurger from '../../../assets/icons/IconBurger';
import { useSidebar } from '../../../contexts/sidebar/SidebarContext';

type ToolbarProps = {
  children?: ReactNode;
  prefix?: ReactNode;
  buttons?: ReactNode;
};

const Toolbar = ({ prefix, buttons, children }: ToolbarProps) => {
  const [openSidebar] = useSidebar();

  return (
    <nav className="toolbar">
      <div onClick={openSidebar}>
        <IconBurger
          className="mr-1 h-6 w-6 text-silvergrey-300"
          strokeWidth={1.8}
        />
      </div>
      <div className="mr-auto text-lg font-bold capitalize">
        {prefix} {children}
      </div>
      <div className="text-silvergrey-300">{buttons}</div>
    </nav>
  );
};

export default Toolbar;
