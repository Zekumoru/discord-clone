import { ReactNode } from 'react';

type CircledIconButtonProps = {
  onClick?: () => void;
  icon: ReactNode;
  testid?: string;
};

const CircledIconButton = ({
  onClick,
  icon,
  testid,
}: CircledIconButtonProps) => {
  return (
    <span
      data-testid={testid ?? ''}
      onClick={onClick}
      className="grid h-8 w-8 place-content-center rounded-full bg-background-500"
    >
      {icon}
    </span>
  );
};

export default CircledIconButton;
