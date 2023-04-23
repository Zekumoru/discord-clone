import { useEffect, useState } from 'react';
import useCategories from '../../../../../types/category/hooks/useCategories';
import ICategory from '../../../../../types/category/Category';
import { toast } from 'react-toastify';
import useReorderCategories from '../../../hooks/useReorderCategories';
import ScreenModalToolbar from '../../../../../contexts/modal/components/ScreenModalToolbar';
import LoadingScreen from '../../../../LoadingScreen';
import { ReactSortable } from 'react-sortablejs';
import CategoryItem from './CategoryItem';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';
import { useCategoriesId } from '../../../../../types/category/contexts/CategoriesIdContext';

type CategoryReorderItem = {
  id: string;
} & ICategory;

const ReorderCategoriesModal = () => {
  const close = useCloseModal();
  const categoriesId = useCategoriesId();
  const [categoriesData] = useCategories(categoriesId);
  const [categories, setCategories] = useState<CategoryReorderItem[]>();
  const { mutate: reorderCategories, isLoading } = useReorderCategories({
    onSuccess: () => toast.success('Channels reordered successfully!'),
    onError: () => toast.error('Could not reorder channels!'),
    onSettled: close,
  });

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    if (!categoriesData) return;

    setCategories(
      categoriesData.categories.slice(1).map((category) => ({
        ...category,
        id: category.name,
      }))
    );
  }, [categoriesData]);

  const handleDone = () => {
    if (!categories || !categoriesData) {
      toast.error('Could not reorder channels!');
      close();
      return;
    }

    reorderCategories({
      categoriesId: categoriesData.id,
      categories: [categoriesData.categories[0], ...categories],
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

      {categories && (
        <ReactSortable
          list={categories}
          setList={setCategories}
          group="categories"
        >
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </ReactSortable>
      )}
    </div>
  );
};

export default ReorderCategoriesModal;
