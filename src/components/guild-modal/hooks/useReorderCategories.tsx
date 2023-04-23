import { useMutation } from 'react-query';
import ICategory from '../../../types/category/Category';
import categoriesDoc from '../../../types/category/firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import { queryClient } from '../../QueryClientInitializer';

type ReorderCategoriesOptions = {
  categoriesId: string;
  categories: ICategory[];
};

const reorderCategories = async ({
  categoriesId,
  categories,
}: ReorderCategoriesOptions) => {
  const categoriesRef = categoriesDoc(categoriesId);
  const categoriesData = (await getDoc(categoriesRef)).data()!;

  await setDoc(categoriesRef, {
    ...categoriesData,
    categories,
  });
  await queryClient.invalidateQueries(['categories', categoriesId]);
};

type UseReorderCategoriesProps = {
  onSuccess?: () => void;
  onSettled?: () => void;
  onError?: (error: unknown) => void;
};

const useReorderCategories = ({
  onSuccess,
  onSettled,
  onError,
}: UseReorderCategoriesProps = {}) => {
  return useMutation(reorderCategories, {
    onSuccess,
    onSettled,
    onError,
  });
};

export default useReorderCategories;
