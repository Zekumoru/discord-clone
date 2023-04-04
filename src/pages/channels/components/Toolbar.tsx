import { ReactNode } from 'react';
import IconBurger from '../../../assets/icons/IconBurger';

type ToolbarProps = {
  children?: ReactNode;
  prefix?: ReactNode;
  buttons?: ReactNode;
};

const Toolbar = ({ prefix, buttons, children }: ToolbarProps) => {
  return (
    <nav className="toolbar">
      <IconBurger
        className="mr-1 h-6 w-6 text-silvergrey-300"
        strokeWidth={1.8}
      />
      {prefix}
      <div className="mr-auto text-lg font-bold capitalize ">{children}</div>
      <div className="text-silvergrey-300">{buttons}</div>
    </nav>
  );
};

export default Toolbar;
