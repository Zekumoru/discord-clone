import { useMutation } from 'react-query';
import IUser from '../../../../../types/user/User';
import { queryClient } from '../../../../QueryClientInitializer';
import userDoc from '../../../../../types/user/firebase/userDoc';
import { setDoc } from 'firebase/firestore';

type UpdateUsernameArgs = {
  user: IUser;
  newUsername: string;
};

const updateUsername = async ({ user, newUsername }: UpdateUsernameArgs) => {
  const userRef = userDoc(user.id);

  await setDoc(userRef, {
    ...user,
    username: newUsername,
  });

  await queryClient.invalidateQueries(['user', 'current']);
};

type UseUpdateUsernameProps = {
  onSuccess?: () => void;
};

const useUpdateUsername = ({ onSuccess }: UseUpdateUsernameProps = {}) => {
  return useMutation(updateUsername, {
    onSuccess,
  });
};

export default useUpdateUsername;
