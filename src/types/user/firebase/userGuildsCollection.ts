import createCollection from '../../../utils/firebase/createCollection';
import { IUserGuilds } from '../../guild/Guild';

const userGuildsCollection = createCollection<IUserGuilds>('user-guilds');

export default userGuildsCollection;
