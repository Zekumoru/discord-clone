import InsetList from '../../../../../components/modal-utils/InsetList';
import InsetListItem from '../../../../../components/modal-utils/InsetListItem';
import ModalChevronCloseButton from '../../../../../components/modal-utils/ModalChevronCloseButton';
import useCategories from '../../../../../types/category/hooks/useCategories';
import { ScreenModalProps } from '../../../../screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../screen-modal/components/ScreenModalToolbar';

type CategoryPickerModalProps = {
  categoryName: string;
  categoriesId: string;
  onPick: (categoryName: string) => void;
} & ScreenModalProps;

const CategoryPickerModal = ({
  categoryName,
  categoriesId,
  onPick,
  close,
}: CategoryPickerModalProps) => {
  const [categories] = useCategories(categoriesId);

  const handlePickCategory = (categoryName: string) => {
    onPick(categoryName);
  };

  return (
    <div className="mb-4">
      <ScreenModalToolbar
        leftElement={
          <ModalChevronCloseButton close={close}>Back</ModalChevronCloseButton>
        }
      >
        Change Category
      </ScreenModalToolbar>

      <div className="heading-2 mx-4 mb-2 mt-8">
        Move from {categoryName} to
      </div>

      {categoryName !== 'Uncategorized' && (
        <InsetList className="mb-6">
          <InsetListItem
            onClick={() => handlePickCategory('')}
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
              onClick={() => handlePickCategory(category.name)}
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

export default CategoryPickerModal;
