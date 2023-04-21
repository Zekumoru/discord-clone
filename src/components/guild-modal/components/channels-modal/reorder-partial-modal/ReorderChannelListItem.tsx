import { PartialScreenModalProps } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import { useScreenModal } from '../../../../../contexts/screen-modal/ScreenModalContext';

type ReorderChannelListItemProps = {
  categoriesId: string;
} & PartialScreenModalProps;

const ReorderChannelListItem = ({
  categoriesId,
  close,
}: ReorderChannelListItemProps) => {
  const [openModal, closeModal] = useScreenModal();

  const openReorderChannelModal = () => {};

  return (
    <li
      onClick={openReorderChannelModal}
      className="flex items-center gap-2 px-4 py-3 font-semibold text-silvergrey-300"
    >
      <span className="grid h-6 w-6 place-content-center text-xl font-bold text-silvergrey-400">
        #
      </span>
      <span>Channel</span>
    </li>
  );
};

export default ReorderChannelListItem;
