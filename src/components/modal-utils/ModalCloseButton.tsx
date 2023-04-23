import { useCloseModal } from '../../contexts/modal/ModalContext';

type ModalCloseButtonProps = {
  className?: string;
};

const ModalCloseButton = ({ className }: ModalCloseButtonProps) => {
  const close = useCloseModal();

  return (
    <button className={className ?? 'font-medium'} onClick={() => close()}>
      Close
    </button>
  );
};

export default ModalCloseButton;
