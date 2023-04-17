import { useQuery } from 'react-query';
import categoriesDoc from '../firebase/categoriesDoc';
import { getDoc } from 'firebase/firestore';

const getCategories = async (categoriesId: string) => {
  const categoriesRef = categoriesDoc(categoriesId);
  return (await getDoc(categoriesRef)).data()!;
};

const useCategories = (categoriesId: string | undefined) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery(
    ['categories', categoriesId],
    async () => await getCategories(categoriesId!),
    {
      enabled: !!categoriesId,
    }
  );

  return [categories, isLoading, error] as const;
};

export default useCategories;
