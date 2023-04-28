import { MentionData } from '@draft-js-plugins/mention';
import IUser from '../../../../../../types/user/User';

interface MentionUserData extends MentionData {
  user?: IUser;
}

export default MentionUserData;
