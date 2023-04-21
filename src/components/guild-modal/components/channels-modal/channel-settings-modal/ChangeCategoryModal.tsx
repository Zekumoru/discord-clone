import ScreenModalToolbar from '../../../../../contexts/screen-modal/components/ScreenModalToolbar';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import { ScreenModalProps } from '../../../../../contexts/screen-modal/ScreenModalContext';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';
import useCategories from '../../../../../types/category/hooks/useCategories';
import InsetList from '../../../../modal-utils/InsetList';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import IChannel from '../../../../../types/channel/Channel';
import useChangeCategory from '../../../hooks/useChangeCategory';
import { toast } from 'react-toastify';
import DiscordError from '../../../../../utils/DiscordError';
import LoadingScreen from '../../../../LoadingScreen';

type ChangeCategoryModalProps = {
  channel: IChannel;
  categoryName: string;
} & ScreenModalProps;

const ChangeCategoryModal = ({
  categoryName,
  channel,
  close,
}: ChangeCategoryModalProps) => {
  const categoriesId = useCategoriesId();
  const [categories] = useCategories(categoriesId);
  const { mutate: changeCategory, isLoading } = useChangeCategory({
    onSuccess: () => {
      toast.success("Channel's category has been updated!");
      close();
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

  return (
    <div className="mb-4">
      {isLoading && <LoadingScreen />}

      <ScreenModalToolbar
        leftElement={
          <ModalChevronCloseButton close={close}>Back</ModalChevronCloseButton>
        }
      >
        Change Category
      </ScreenModalToolbar>

      <div className="heading-2 mx-4 mb-2 mt-10">
        Move from {categoryName} to
      </div>
      {categoryName !== 'Uncategorized' && (
        <InsetList className="mb-6">
          <InsetListItem
            onClick={() => handleChangeCategory('')}
            className="text-silvergrey-100"
          >
            Uncategorized
          </InsetListItem>
        </InsetList>
      )}

      <InsetList>
        {categories?.categories.map((category) =>
          category.name === '' || category.name === categoryName ? null : (
            <InsetListItem
              onClick={() => handleChangeCategory(category.name)}
              key={category.name}
            >
              <span className="truncate text-silvergrey-100">
                {category.name}
              </span>
            </InsetListItem>
          )
        )}
      </InsetList>
    </div>
  );
};

export default ChangeCategoryModal;
