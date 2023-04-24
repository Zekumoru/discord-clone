import { useMutation } from 'react-query';
import categoriesDoc from '../firebase/categoriesDoc';
import { getDoc, setDoc } from 'firebase/firestore';
import createCategory from '../utils/createCategory';
import { queryClient } from '../../../components/QueryClientInitializer';
import DiscordError from '../../../utils/DiscordError';
import performBatch from '../../../utils/performBatch';
import createCategoryLog from '../../guild-log/utils/createCategoryLog';

type CreateCategoryOptions = {
  categoriesId: string;
  categoryName: string;
};

const createNewCategory = async ({
  categoriesId,
  categoryName,
}: CreateCategoryOptions) => {
  const categoriesRef = categoriesDoc(categoriesId);
  const categories = (await getDoc(categoriesRef)).data()!;

  if (
    categories.categories.find((category) => category.name === categoryName)
  ) {
    throw new DiscordError('already-exists', 'Category already exists!');
  }

  categories.categories.push(createCategory(categoryName, []));

  await performBatch((batch) => {
    batch.set(categoriesRef, categories);

    createCategoryLog(batch, categories.guildId, {
      categoriesId,
      categoryName,
      type: 'category-created',
    });
  });

  await queryClient.invalidateQueries(['categories', categoriesId]);
};

type UseCreateCategoryProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useCreateCategory = ({
  onSuccess,
  onError,
}: UseCreateCategoryProps = {}) => {
  return useMutation(createNewCategory, {
    onSuccess,
    onError,
  });
};

export default useCreateCategory;
