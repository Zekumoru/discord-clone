import { useState } from 'react';
import ModalCloseButton from '../../../../components/modal-utils/ModalCloseButton';
import ScreenModalToolbar from '../../../modal/components/ScreenModalToolbar';
import InsetList from '../../../../components/modal-utils/InsetList';
import useCreateCategory from '../../../../types/category/hooks/useCreateCategory';
import LoadingScreen from '../../../../components/LoadingScreen';
import DiscordError from '../../../../utils/DiscordError';
import { toast } from 'react-toastify';
import InsetTextInput from '../../../../components/modal-utils/InsetTextInput';
import { useCloseModal } from '../../../modal/ModalContext';

type CreateCategoryModalProps = {
  categoriesId: string;
};

const CreateCategoryModal = ({ categoriesId }: CreateCategoryModalProps) => {
  const close = useCloseModal();
  const [categoryName, setCategoryName] = useState('');
  const { mutate: createCategory, isLoading } = useCreateCategory({
    onSuccess: () => {
      toast.success('Category created successfully!');
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
    <div className="mb-4">
      {isLoading && <LoadingScreen />}

      <ScreenModalToolbar
        leftElement={<ModalCloseButton className="font-medium text-white" />}
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
        <InsetTextInput
          value={categoryName}
          placeholder="New category"
          onChange={handleCategoryNameChange}
          maxLength={32}
        />
      </InsetList>
    </div>
  );
};

export default CreateCategoryModal;
