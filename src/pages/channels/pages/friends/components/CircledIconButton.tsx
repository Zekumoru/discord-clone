import { ReactNode } from 'react';

type CircledIconButtonProps = {
  onClick?: () => void;
  icon: ReactNode;
};

const CircledIconButton = ({ onClick, icon }: CircledIconButtonProps) => {
  return (
    <span
      onClick={onClick}
      className="grid h-8 w-8 place-content-center rounded-full bg-background-500"
    >
      {icon}
    </span>
  );
};

export default CircledIconButton;
