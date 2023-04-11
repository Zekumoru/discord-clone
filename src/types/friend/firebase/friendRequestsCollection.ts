import createCollection from '../../../utils/firebase/createCollection';
import { IFriendRequests } from '../Friend';

const friendRequestsCollection =
  createCollection<IFriendRequests>('friend-requests');

export default friendRequestsCollection;
