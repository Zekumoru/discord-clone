import { ReactNode } from 'react';
import IconBurger from '../../../assets/icons/IconBurger';

type ToolbarProps = {
  children?: ReactNode;
  prefix?: ReactNode;
  buttons?: ReactNode;
};

const Toolbar = ({ prefix, buttons, children }: ToolbarProps) => {
  return (
    <nav className="sticky top-0 z-30 flex h-14 items-center gap-1 bg-background-500 px-4 py-2 shadow-material">
      <IconBurger className="mr-1 h-6 w-6" strokeWidth={1.8} />
      {prefix}
      <div className="mr-auto text-lg font-bold capitalize">{children}</div>
      {buttons}
    </nav>
  );
};

export default Toolbar;
