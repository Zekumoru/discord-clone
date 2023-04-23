import { usePartialModal } from '../../../contexts/partial-screen-modal/PartialScreenModalContext';
import UserPartialModal from '../UserPartialModal';

const useUserPartialModal = () => {
  const [openPartialModal] = usePartialModal();

  const open = (userId: string | undefined) => {
    if (userId === undefined) {
      throw new Error('Cannot open user partial modal. User id is missing.');
    }

    openPartialModal(<UserPartialModal userId={userId} />);
  };

  return [open, close] as const;
};

export default useUserPartialModal;
