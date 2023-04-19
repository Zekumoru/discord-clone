import { MouseEventHandler } from 'react';
import { ScreenModalMethods } from '../../contexts/screen-modal/ScreenModalContext';

type ModalCloseButtonProps = {
  className?: string;
  close: ScreenModalMethods[1];
};

const ModalCloseButton = ({ close, className }: ModalCloseButtonProps) => {
  return (
    <button className={className ?? 'font-medium'} onClick={() => close()}>
      Close
    </button>
  );
};

export default ModalCloseButton;
