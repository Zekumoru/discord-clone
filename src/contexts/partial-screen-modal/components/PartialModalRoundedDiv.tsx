import { ReactNode } from 'react';

type PartialModalRoundedDivProps = {
  children: ReactNode;
};

const PartialModalRoundedDiv = ({ children }: PartialModalRoundedDivProps) => {
  return <div className="rounded-lg bg-background-700 py-4">{children}</div>;
};

export default PartialModalRoundedDiv;
