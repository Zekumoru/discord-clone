import { ReactNode } from 'react';

type ScreenModalToolbarProps = {
  children?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

const ScreenModalToolbar = ({
  children,
  leftElement,
  rightElement,
}: ScreenModalToolbarProps) => {
  return (
    <nav className="toolbar grid grid-cols-center-3">
      <div className="text-silvergrey-300">{leftElement}</div>
      <div className="mx-auto text-center font-bold capitalize">{children}</div>
      <div className="ml-auto text-silvergrey-300">{rightElement}</div>
    </nav>
  );
};

export default ScreenModalToolbar;
