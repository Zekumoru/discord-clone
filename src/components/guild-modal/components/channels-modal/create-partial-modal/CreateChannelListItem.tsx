import { PartialScreenModalProps } from '../../../../../contexts/partial-screen-modal/PartialScreenModalContext';
import { useModal } from '../../../../../contexts/modal/ModalContext';
import CreateChannelModal from '../../../../../contexts/sidebar/components/modals/create-channel/CreateChannelModal';

type CreateChannelListItemProps = {
  categoriesId: string;
} & PartialScreenModalProps;

const CreateChannelListItem = ({
  categoriesId,
  close,
}: CreateChannelListItemProps) => {
  const [openModal] = useModal();

  const openCreateChannelModal = () => {
    openModal(
      <CreateChannelModal initialCategoryName="" categoriesId={categoriesId} />
    );
    close();
  };

  return (
    <li
      onClick={openCreateChannelModal}
      className="flex items-center gap-2 px-4 py-3 font-semibold text-silvergrey-300"
    >
      <span className="grid h-6 w-6 place-content-center text-xl font-bold text-silvergrey-400">
        #
      </span>
      <span>Channel</span>
    </li>
  );
};

export default CreateChannelListItem;
