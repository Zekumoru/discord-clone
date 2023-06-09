import { ReactNode } from 'react';
import IconBurger from '../../../assets/icons/IconBurger';
import { useSidebar } from '../../../contexts/sidebar/SidebarContext';

type ToolbarProps = {
  children?: ReactNode;
  prefix?: ReactNode;
  buttons?: ReactNode;
  className?: string;
};

const Toolbar = ({ prefix, buttons, children, className }: ToolbarProps) => {
  const [openSidebar] = useSidebar();

  return (
    <>
      <div className="h-toolbar" />
      <nav className={`toolbar md-w-sidebar ${className ?? ''}`}>
        <div className="md:hidden" onClick={openSidebar}>
          <IconBurger
            className="mr-1 h-6 w-6 text-silvergrey-300"
            strokeWidth={1.8}
          />
        </div>
        <div className="mr-2 truncate text-lg font-bold">
          {prefix} {children}
        </div>
        <div className="ml-auto text-silvergrey-300">{buttons}</div>
      </nav>
    </>
  );
};

export default Toolbar;
