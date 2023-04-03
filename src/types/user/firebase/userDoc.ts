import createDoc from '../../../utils/firebase/createDoc';
import IUser from '../User';

const userDoc = (id: string) => {
  return createDoc<IUser>(`users/${id}`);
};

export default userDoc;
