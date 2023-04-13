import { ReactNode } from 'react';
import { IconChevronLeft } from '../../assets/icons';
import { ScreenModalMethods } from '../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../contexts/screen-modal/components/ScreenModalToolbar';

type ModalChevronCloseButtonProps = {
  children: ReactNode;
  close: ScreenModalMethods[1];
};

const ModalChevronCloseButton = ({
  children,
  close,
}: ModalChevronCloseButtonProps) => {
  return (
    <button onClick={close} className="flex overflow-x-hidden">
      <IconChevronLeft className="relative top-[1.1px] h-5 w-5" />
      <span className="truncate font-medium">{children}</span>
    </button>
  );
};

export default ModalChevronCloseButton;
