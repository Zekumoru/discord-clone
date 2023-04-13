import { ScreenModalMethods } from '../../contexts/screen-modal/ScreenModalContext';

type ModalCloseButtonProps = {
  close: ScreenModalMethods[1];
};

const ModalCloseButton = ({ close }: ModalCloseButtonProps) => {
  return (
    <button className="font-medium" onClick={close}>
      Close
    </button>
  );
};

export default ModalCloseButton;
