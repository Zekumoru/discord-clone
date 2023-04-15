import { ReactNode } from 'react';
import ScreenModalProvider, {
  useScreenModal,
} from '../../contexts/screen-modal/ScreenModalContext';

type InsetListProps = {
  children?: ReactNode;
  className?: string;
};

const InsetList = ({ children, className }: InsetListProps = {}) => {
  const [_, closeModal] = useScreenModal();

  return (
    <ScreenModalProvider previousCloseFn={closeModal}>
      <ul className={`border-y border-background-700 ${className ?? ''}`}>
        {children}
      </ul>
    </ScreenModalProvider>
  );
};

export default InsetList;
