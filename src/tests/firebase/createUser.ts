import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import removeTagFromName from '../../utils/removeTagFromName';
import initUserCollections from '../../pages/authentication/pages/utils/initUserCollections';
import { nanoid } from 'nanoid';

const createUser = async (username: string) => {
  const name = removeTagFromName(username);
  const email = `${name}-${nanoid()}@discord-clone.com`;
  const password = `${name}@password`;

  const { user } = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );

  await updateProfile(user, { displayName: username });
  await initUserCollections(user, username);

  return [user, email, password] as const;
};

export default createUser;
