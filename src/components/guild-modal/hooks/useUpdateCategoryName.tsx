import { useMutation } from 'react-query';
import categoriesDoc from '../../../types/category/firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import DiscordError from '../../../utils/DiscordError';
import { queryClient } from '../../QueryClientInitializer';

type UpdateCategoryNameOptions = {
  categoriesId: string;
  categoryName: string;
  newCategoryName: string;
};

const updateCategoryName = async ({
  categoriesId,
  categoryName,
  newCategoryName,
}: UpdateCategoryNameOptions) => {
  const categoriesRef = categoriesDoc(categoriesId);
  const categories = (await getDoc(categoriesRef)).data()!;

  const category = categories.categories.find(
    (category) => category.name === categoryName
  );
  if (!category) {
    throw new DiscordError('missing-category', 'Category is missing!');
  }

  category.name = newCategoryName;

  await setDoc(categoriesRef, categories);
  await queryClient.invalidateQueries(['categories', categoriesId]);
};

type UseUpdateCategoryNameProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useUpdateCategoryName = ({
  onSuccess,
  onError,
}: UseUpdateCategoryNameProps = {}) => {
  return useMutation(updateCategoryName, {
    onSuccess,
    onError,
  });
};

export default useUpdateCategoryName;
