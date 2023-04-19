import createCollection from '../../../utils/firebase/createCollection';
import { IMembers } from '../Member';

const membersCollection = createCollection<IMembers>(`members`);

export default membersCollection;
