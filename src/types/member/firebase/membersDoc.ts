import createDoc from '../../../utils/firebase/createDoc';
import { IMembers } from '../Member';

const membersDoc = (id: string) => {
  return createDoc<IMembers>(`members/${id}`);
};

export default membersDoc;
