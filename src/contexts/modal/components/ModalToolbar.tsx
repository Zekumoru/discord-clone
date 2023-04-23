import { ReactNode } from 'react';

type ModalToolbarProps = {
  children?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

const ModalToolbar = ({
  children,
  leftElement,
  rightElement,
}: ModalToolbarProps) => {
  return (
    <>
      <div className="h-toolbar" />
      <nav className="toolbar grid grid-cols-center-3">
        <div className="text-silvergrey-300">{leftElement}</div>
        <div className="mx-auto text-center font-bold capitalize">
          {children}
        </div>
        <div className="ml-auto text-silvergrey-300">{rightElement}</div>
      </nav>
    </>
  );
};

export default ModalToolbar;
