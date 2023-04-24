import { ReactNode } from 'react';

type InsetListProps = {
  children?: ReactNode;
  className?: string;
};

const InsetList = ({ children, className }: InsetListProps = {}) => {
  return (
    <ul className={`border-y border-background-700 ${className ?? ''}`}>
      {children}
    </ul>
  );
};

export default InsetList;
