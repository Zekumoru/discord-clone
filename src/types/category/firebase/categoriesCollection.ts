import createCollection from '../../../utils/firebase/createCollection';
import { ICategories } from '../Category';

const categoriesCollection = createCollection<ICategories>('categories');

export default categoriesCollection;
