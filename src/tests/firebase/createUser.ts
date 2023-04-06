import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import removeTagFromName from '../../utils/removeTagFromName';
import initUserCollections from '../../pages/authentication/pages/utils/initUserCollections';

const createUser = async (username: string) => {
  const name = removeTagFromName(username);
  const email = `${name}@discord-clone.com`;
  const password = `${name}@password`;

  const { user } = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );

  await updateProfile(user, { displayName: username });
  await initUserCollections(user, username);

  return user;
};

export default createUser;
