import { useEffect, useState } from 'react';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';
import ScreenModalToolbar from '../../../../../contexts/modal/components/ScreenModalToolbar';
import useCategories from '../../../../../types/category/hooks/useCategories';
import CategoryGroup from './CategoryGroup';
import ICategory from '../../../../../types/category/Category';
import useReorderCategories from '../../../hooks/useReorderCategories';
import LoadingScreen from '../../../../LoadingScreen';
import { toast } from 'react-toastify';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';

const ReorderChannelsModal = () => {
  const close = useCloseModal();
  const categoriesId = useCategoriesId();
  const [categoriesData] = useCategories(categoriesId);
  const [categories, setCategories] = useState<ICategory[]>();
  const { mutate: reorderCategories, isLoading } = useReorderCategories({
    onSuccess: () => toast.success('Channels reordered successfully!'),
    onError: () => toast.error('Could not reorder channels!'),
    onSettled: close,
  });

  useEffect(() => {
    if (!categoriesData) return;

    setCategories(categoriesData.categories);
  }, [categoriesData]);

  const handleReorder = (reorderedCategory: ICategory) => {
    setCategories((categories) => {
      if (!categories) return categories;

      return categories.map((category) => {
        if (category.name === reorderedCategory.name) {
          return reorderedCategory;
        }

        return category;
      });
    });
  };

  const handleDone = () => {
    if (!categories || !categoriesData) {
      toast.error('Could not reorder channels!');
      close();
      return;
    }

    reorderCategories({
      categoriesId: categoriesData.id,
      categories,
    });
  };

  return (
    <div className="mb-4">
      {isLoading && <LoadingScreen />}

      <ScreenModalToolbar
        rightElement={
          <button onClick={handleDone} className={`font-semibold text-white`}>
            Done
          </button>
        }
      >
        Reorder Channels
      </ScreenModalToolbar>

      <div className="mt-2" />

      {categories?.map((category) => (
        <CategoryGroup
          key={category.name}
          category={category}
          onReorder={handleReorder}
        />
      ))}
    </div>
  );
};

export default ReorderChannelsModal;
