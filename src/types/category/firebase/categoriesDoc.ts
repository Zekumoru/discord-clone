import createDoc from '../../../utils/firebase/createDoc';
import { ICategories } from '../Category';

const categoriesDoc = (id: string) => {
  return createDoc<ICategories>(`categories/${id}`);
};

export default categoriesDoc;
