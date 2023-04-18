import createCollection from '../../../utils/firebase/createCollection';
import IInvite from '../Invite';

const invitesCollection = createCollection<IInvite>('invites');

export default invitesCollection;
