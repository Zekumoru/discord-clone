import { toast } from 'react-toastify';
import { IconFolderPlus } from '../../../../../assets/icons';
import { useScreenModal } from '../../../../../contexts/screen-modal/ScreenModalContext';
import InsetChevronListItem from '../../../../modal-utils/InsetChevronListItem';
import IChannel from '../../../../../types/channel/Channel';
import CategoryPickerModal from '../../../../../contexts/sidebar/components/modals/create-channel/CategoryPickerModal';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';
import useChangeCategory from '../../../hooks/useChangeCategory';
import DiscordError from '../../../../../utils/DiscordError';
import LoadingScreen from '../../../../LoadingScreen';

type ChangeCategoryListItemProps = {
  channel: IChannel;
  categoryName: string | undefined;
};

const ChangeCategoryListItem = ({
  channel,
  categoryName,
}: ChangeCategoryListItemProps) => {
  const categoriesId = useCategoriesId();
  const [openModal, closeModal] = useScreenModal();
  const { mutate: changeCategory, isLoading } = useChangeCategory({
    onSuccess: () => {
      toast.success("Channel's category has been updated!");
      closeModal();
    },
    onError: (error) => {
      if (!(error instanceof DiscordError)) {
        toast.error('An unknown error has occurred!');
        return;
      }

      toast.error(error.message);
    },
  });

  const handleChangeCategory = (categoryName: string) => {
    if (!categoriesId) {
      toast.error('Could not change category!');
      return;
    }

    changeCategory({
      categoriesId,
      channelId: channel.id,
      moveToCategoryName: categoryName,
    });
  };

  const openChangeCategoryModal = () => {
    if (categoryName === undefined || !categoriesId) {
      toast.error('Could not open modal!');
      return;
    }

    openModal(
      <CategoryPickerModal
        categoriesId={categoriesId}
        categoryName={categoryName}
        onPick={handleChangeCategory}
        close={closeModal}
      />
    );
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <InsetChevronListItem
        onClick={openChangeCategoryModal}
        labelPrefix={<IconFolderPlus className="h-6 w-6 text-silvergrey-400" />}
        label="Category"
        value={categoryName === '' ? 'Uncategorized' : categoryName}
      />
    </>
  );
};

export default ChangeCategoryListItem;
