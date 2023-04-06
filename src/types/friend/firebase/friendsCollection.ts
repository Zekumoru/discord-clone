import createCollection from '../../../utils/firebase/createCollection';
import { IFriends } from '../Friend';

const friendsCollection = createCollection<IFriends>('friends');

export default friendsCollection;
