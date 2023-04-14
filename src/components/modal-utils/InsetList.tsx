import { ReactNode } from 'react';
import ScreenModalProvider from '../../contexts/screen-modal/ScreenModalContext';

type InsetListProps = {
  children?: ReactNode;
  className?: string;
};

const InsetList = ({ children, className }: InsetListProps = {}) => {
  return (
    <ScreenModalProvider>
      <ul className={`border-y border-background-700 ${className ?? ''}`}>
        {children}
      </ul>
    </ScreenModalProvider>
  );
};

export default InsetList;
