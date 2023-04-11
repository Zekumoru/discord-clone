import { User, getAuth } from 'firebase/auth';
import { nanoid } from 'nanoid';
import IUser from '../../types/user/User';
import { deleteDoc } from 'firebase/firestore';
import userDoc from '../../types/user/firebase/userDoc';
import userGuildsDoc from '../../types/user/firebase/userGuildsDoc';
import userChatsDoc from '../../types/user-chat/firebase/userChatsDoc';
import friendsDoc from '../../types/friend/firebase/friendsDoc';
import friendRequestsDoc from '../../types/friend/firebase/friendRequestsDoc';
import initUserCollections from '../../pages/authentication/pages/utils/initUserCollections';
import { useAuthState } from 'react-firebase-hooks/auth';

const createUser = async (username: string) => {
  const user = getAuth().currentUser;
  if (user === null) {
    throw new Error(
      'Cannot create a new Discord user. Firebase user is not logged in.'
    );
  }

  const firebaseId = nanoid();
  const email = `${firebaseId}@discord-clone.com`;
  return await initUserCollections(
    {
      ...user,
      uid: firebaseId,
      email,
    },
    `[${nanoid()}] ${username}`
  );
};

const deleteAllUserCollections = async (user: IUser) => {
  await Promise.all([
    deleteDoc(userDoc(user.id)),
    deleteDoc(userGuildsDoc(user.guildsId)),
    deleteDoc(userChatsDoc(user.userChatsId)),
    deleteDoc(friendsDoc(user.friendsId)),
    deleteDoc(friendRequestsDoc(user.friendRequestsId)),
  ]);
};

const mockUseAuthState = ({ firebaseId, email }: IUser) => {
  const mockedUseAuthState = vi.mocked(useAuthState);
  if (!('mockReturnValue' in mockedUseAuthState)) {
    throw new Error('react-firebase-hooks/auth needs to be mocked.');
  }

  mockedUseAuthState.mockReturnValue([
    { uid: firebaseId, email } as User,
    false,
    undefined,
  ]);
};

type CleanUpFunction = () => Promise<void>;
type SetupTestOptions = {
  usernames?: string[];
  mockUseAuthState?: boolean;
};

const setupTest = async (
  options: SetupTestOptions = {}
): Promise<[CleanUpFunction, ...IUser[]]> => {
  const { usernames } = options;
  let users: IUser[];

  if (usernames === undefined) {
    users = [await createUser('User#0000')];
  } else {
    users = await Promise.all(
      usernames.map((username) => createUser(username))
    );
  }

  if (options.mockUseAuthState) {
    mockUseAuthState(users[0]);
  }

  const cleanup: CleanUpFunction = async () => {
    await Promise.all(users.map((user) => deleteAllUserCollections(user)));
  };

  return [cleanup, ...users];
};

export default setupTest;
