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
      <div>{leftElement}</div>
      <div className="mx-auto text-center font-bold capitalize">{children}</div>
      <div className="ml-auto">{rightElement}</div>
    </nav>
  );
};

export default ScreenModalToolbar;
