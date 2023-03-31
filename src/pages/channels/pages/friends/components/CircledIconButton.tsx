import { ReactNode } from 'react';

type CircledIconButtonProps = {
  icon: ReactNode;
};

const CircledIconButton = ({ icon }: CircledIconButtonProps) => {
  return (
    <span className="grid h-8 w-8 place-content-center rounded-full bg-background-500">
      {icon}
    </span>
  );
};

export default CircledIconButton;
