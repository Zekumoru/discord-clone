import createCollection from '../../../utils/firebase/createCollection';
import IGuild from '../Guild';

const guildsCollection = createCollection<IGuild>('guilds');

export default guildsCollection;
