import { useState } from 'react';
import ModalCloseButton from '../../../../components/modal-utils/ModalCloseButton';
import { ScreenModalProps } from '../../../screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../screen-modal/components/ScreenModalToolbar';
import InsetList from '../../../../components/modal-utils/InsetList';
import InsetListItem from '../../../../components/modal-utils/InsetListItem';
import useCreateCategory from '../../../../types/category/hooks/useCreateCategory';
import LoadingScreen from '../../../../components/LoadingScreen';

type CreateCategoryModalProps = {
  categoriesId: string;
} & ScreenModalProps;

const CreateCategoryModal = ({
  categoriesId,
  close,
}: CreateCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState('');
  const { mutate: createCategory, isLoading } = useCreateCategory({
    onSuccess: close,
  });

  const handleCreateCategory = () => {
    createCategory({
      categoriesId,
      categoryName,
    });
  };

  const handleCategoryNameChange = (categoryName: string) => {
    setCategoryName(categoryName);
  };

  return (
    <div className="min-h-screen bg-background-300">
      {isLoading && <LoadingScreen />}

      <ScreenModalToolbar
        leftElement={
          <ModalCloseButton className="font-medium text-white" close={close} />
        }
        rightElement={
          <button
            onClick={handleCreateCategory}
            className={`font-medium ${categoryName !== '' ? 'text-white' : ''}`}
            disabled={categoryName === ''}
          >
            Create
          </button>
        }
      >
        Create Category
      </ScreenModalToolbar>

      <div className="heading-2 mx-4 mb-2 mt-8">Category Name</div>
      <InsetList>
        <InsetListItem className="w-full">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => handleCategoryNameChange(e.target.value)}
            className="w-full bg-transparent font-medium text-white outline-none placeholder:text-silvergrey-400"
            placeholder="New category"
          />
        </InsetListItem>
      </InsetList>
    </div>
  );
};

export default CreateCategoryModal;
