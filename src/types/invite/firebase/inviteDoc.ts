import createDoc from '../../../utils/firebase/createDoc';
import IInvite from '../Invite';

const inviteDoc = (id: string) => {
  return createDoc<IInvite>(`invites/${id}`);
};

export default inviteDoc;
