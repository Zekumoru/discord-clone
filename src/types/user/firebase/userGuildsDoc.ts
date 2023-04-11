import createDoc from '../../../utils/firebase/createDoc';
import { IUserGuilds } from '../../guild/Guild';

const userGuildsDoc = (userGuildsId: string) => {
  return createDoc<IUserGuilds>(`user-guilds/${userGuildsId}`);
};

export default userGuildsDoc;
