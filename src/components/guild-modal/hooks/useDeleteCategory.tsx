import { useMutation } from 'react-query';
import categoriesDoc from '../../../types/category/firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import { queryClient } from '../../QueryClientInitializer';
import DiscordError from '../../../utils/DiscordError';

type DeleteCategoryOptions = {
  categoriesId: string;
  categoryName: string;
};

const deleteCategory = async ({
  categoriesId,
  categoryName,
}: DeleteCategoryOptions) => {
  const categoriesRef = categoriesDoc(categoriesId);
  const categories = (await getDoc(categoriesRef)).data()!;

  const category = categories.categories.find(
    (category) => category.name === categoryName
  );
  if (!category) {
    throw new DiscordError('missing-category', 'Category is missing!');
  }

  const uncategorized = categories.categories.find(
    (category) => category.name === ''
  );
  if (!uncategorized) {
    throw new DiscordError(
      'missing-category',
      'Uncategorized category is missing!'
    );
  }

  uncategorized.channels.push(...category.channels);
  categories.categories = categories.categories.filter(
    (category) => category.name !== categoryName
  );

  await setDoc(categoriesRef, categories);
  await queryClient.invalidateQueries(['categories', categoriesId]);
};

type UseDeleteCategoryProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useDeleteCategory = ({
  onSuccess,
  onError,
}: UseDeleteCategoryProps = {}) => {
  return useMutation(deleteCategory, {
    onSuccess,
    onError,
  });
};

export default useDeleteCategory;
