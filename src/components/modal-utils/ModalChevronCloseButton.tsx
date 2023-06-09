import { ReactNode } from 'react';
import { IconChevronLeft } from '../../assets/icons';
import { useCloseModal } from '../../contexts/modal/ModalContext';

type ModalChevronCloseButtonProps = {
  children: ReactNode;
};

const ModalChevronCloseButton = ({
  children,
}: ModalChevronCloseButtonProps) => {
  const close = useCloseModal();

  return (
    <button
      onClick={() => close()}
      className="flex items-center overflow-x-hidden"
    >
      <IconChevronLeft
        strokeWidth={3}
        className="relative -top-[1px] mr-0.5 h-4 w-4"
      />
      <span className="truncate font-medium">{children}</span>
    </button>
  );
};

export default ModalChevronCloseButton;
