import { usePartialScreenModal } from '../../../contexts/partial-screen-modal/PartialScreenModalContext';
import UserPartialModal from '../UserPartialModal';

const useUserPartialModal = () => {
  const [openPartialModal, closePartialModal] = usePartialScreenModal();

  const open = (userId: string) => {
    openPartialModal(
      <UserPartialModal userId={userId} close={closePartialModal} />
    );
  };

  const close = () => {
    closePartialModal();
  };

  return [open, close] as const;
};

export default useUserPartialModal;
