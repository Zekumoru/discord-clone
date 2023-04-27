import { useMutation } from 'react-query';
import IUser from '../../../../../types/user/User';
import { queryClient } from '../../../../QueryClientInitializer';
import userDoc from '../../../../../types/user/firebase/userDoc';
import { setDoc } from 'firebase/firestore';
import findUserByUsername from '../../../../../types/user/firebase/findUserByUsername';
import DiscordError from '../../../../../utils/DiscordError';
import { getAuth, updateProfile } from 'firebase/auth';

type UpdateUsernameArgs = {
  user: IUser;
  newUsername: string;
};

const updateUsername = async ({ user, newUsername }: UpdateUsernameArgs) => {
  const userRef = userDoc(user.id);
  const taken = !!(await findUserByUsername(newUsername));

  if (taken) {
    throw new DiscordError(
      'username-taken',
      `Could not update username! The new username is already taken: ${newUsername}`
    );
  }

  await updateProfile(getAuth().currentUser!, { displayName: newUsername });
  await setDoc(userRef, {
    ...user,
    username: newUsername,
  });

  await queryClient.invalidateQueries(['user', 'current']);
};

type UseUpdateUsernameProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const useUpdateUsername = ({
  onSuccess,
  onError,
}: UseUpdateUsernameProps = {}) => {
  return useMutation(updateUsername, {
    onSuccess,
    onError,
  });
};

export default useUpdateUsername;
