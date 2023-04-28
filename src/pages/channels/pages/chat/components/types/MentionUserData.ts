import { MentionData } from '@draft-js-plugins/mention';
import IUser from '../../../../../../types/user/User';

const EVERYONE_MENTION_ID = '00000000000000000';
const HERE_MENTION_ID = '00000000000000001';

interface MentionUserData extends MentionData {
  user?: IUser;
}

export default MentionUserData;
export { EVERYONE_MENTION_ID, HERE_MENTION_ID };
