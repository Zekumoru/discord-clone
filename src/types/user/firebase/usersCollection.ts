import createCollection from '../../../utils/firebase/createCollection';
import IUser from '../User';

const usersCollection = createCollection<IUser>('users');

export default usersCollection;
