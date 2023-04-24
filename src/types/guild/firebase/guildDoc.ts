import createDoc from '../../../utils/firebase/createDoc';
import IGuild from '../Guild';

const guildDoc = (id: string) => {
  return createDoc<IGuild>(`guilds/${id}`);
};

export default guildDoc;
