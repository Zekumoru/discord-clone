import { useState } from 'react';
import ModalToolbar from '../../../../../contexts/modal/components/ModalToolbar';
import ICategory from '../../../../../types/category/Category';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';
import useCategories from '../../../../../types/category/hooks/useCategories';
import ModalCloseButton from '../../../../modal-utils/ModalCloseButton';
import { toast } from 'react-toastify';
import ConfirmationDialog from '../../../../dialog/ConfirmationDialog';
import { useDialog } from '../../../../dialog/Dialog';
import InsetList from '../../../../modal-utils/InsetList';
import InsetTextInput from '../../../../modal-utils/InsetTextInput';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import useUpdateCategoryName from '../../../hooks/useUpdateCategoryName';
import DiscordError from '../../../../../utils/DiscordError';
import LoadingScreen from '../../../../LoadingScreen';
import useDeleteCategory from '../../../hooks/useDeleteCategory';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';

type CategorySettingsModalProps = {
  category: ICategory;
};

const CategorySettingsModal = ({ category }: CategorySettingsModalProps) => {
  const close = useCloseModal();
  const [dialogRef, openDialog, closeDialog] = useDialog();
  const categoriesId = useCategoriesId();
  const [categories] = useCategories(categoriesId);
  const [categoryName, setCategoryName] = useState(category.name);
  const hasChanges = categoryName !== category.name && categoryName !== '';
  const { mutate: updateCategoryName, isLoading: updateLoading } =
    useUpdateCategoryName({
      onSuccess: () => {
        toast.success('Category name updated successfully!');
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
  const { mutate: deleteCategory, isLoading: deleteLoading } =
    useDeleteCategory({
      onSuccess: () => {
        toast.success('Category deleted successfully!');
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

  const handleUpdateCategoryName = () => {
    if (!categories) {
      toast.error('Could not update category name!');
      return;
    }

    updateCategoryName({
      categoriesId: categories.id,
      categoryName: category.name,
      newCategoryName: categoryName,
    });
  };

  const handleDeleteCategory = () => {
    if (!categories) {
      toast.error('Could not delete category!');
      return;
    }

    deleteCategory({
      categoriesId: categories.id,
      categoryName: category.name,
    });
  };

  return (
    <div className="mb-4">
      {updateLoading && <LoadingScreen />}

      <ConfirmationDialog
        ref={dialogRef}
        onConfirm={handleDeleteCategory}
        onReject={closeDialog}
        title="Delete Category"
        loading={deleteLoading}
      >
        All this category's channels will go uncategorized. Are you sure you
        want to delete <span className="font-semibold">{categoryName}</span>?
        This cannot be undone.
      </ConfirmationDialog>

      <ModalToolbar
        leftElement={<ModalCloseButton className="font-medium" />}
        rightElement={
          hasChanges && (
            <button
              onClick={handleUpdateCategoryName}
              className={`font-medium text-white`}
            >
              Save
            </button>
          )
        }
      >
        Category Settings
      </ModalToolbar>

      <div className="heading-2 mx-4 mb-2 mt-8">Category name</div>
      <InsetList className="mb-10">
        <InsetTextInput
          value={categoryName}
          onChange={setCategoryName}
          maxLength={32}
        />
      </InsetList>

      <InsetList>
        <InsetListItem onClick={openDialog} className="mx-auto text-salmon-100">
          Delete Category
        </InsetListItem>
      </InsetList>
    </div>
  );
};

export default CategorySettingsModal;
