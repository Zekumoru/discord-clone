import createDoc from '../../../utils/firebase/createDoc';
import { IUserGuilds } from '../../guild/Guild';

const userGuilds = (userGuildsId: string) => {
  return createDoc<IUserGuilds>(`user-guilds/${userGuildsId}`);
};

export default userGuilds;
