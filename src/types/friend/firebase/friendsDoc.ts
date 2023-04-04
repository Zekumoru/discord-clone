import createDoc from '../../../utils/firebase/createDoc';
import { IFriends } from '../Friend';

const friendsDoc = (id: string) => {
  return createDoc<IFriends>(`friends/${id}`);
};

export default friendsDoc;
