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
    <button onClick={close} className="flex items-center overflow-x-hidden">
      <IconChevronLeft
        strokeWidth={3}
        className="relative -top-[1px] mr-0.5 h-4 w-4"
      />
      <span className="truncate font-medium">{children}</span>
    </button>
  );
};

export default ModalChevronCloseButton;
