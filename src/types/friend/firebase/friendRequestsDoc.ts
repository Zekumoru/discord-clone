import createDoc from '../../../utils/firebase/createDoc';
import { IFriendRequests } from '../Friend';

const friendRequestsDoc = (id: string) => {
  return createDoc<IFriendRequests>(`friend-requests/${id}`);
};

export default friendRequestsDoc;
