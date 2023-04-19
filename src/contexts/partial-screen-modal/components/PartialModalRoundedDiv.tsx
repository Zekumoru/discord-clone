import { ReactNode } from 'react';

type PartialModalRoundedDivProps = {
  className?: string;
  children: ReactNode;
};

const PartialModalRoundedDiv = ({
  children,
  className,
}: PartialModalRoundedDivProps) => {
  return (
    <div className={`rounded-lg bg-background-700 ${className}`}>
      {children}
    </div>
  );
};

export default PartialModalRoundedDiv;
