import { useMutation } from 'react-query';
import inviteDoc from '../../../../../types/invite/firebase/inviteDoc';
import generateInviteId from '../../../../../utils/generateInviteId';
import { setDoc } from 'firebase/firestore';

const createInvite = async (guildId: string) => {
  const inviteId = generateInviteId();
  const inviteRef = inviteDoc(inviteId);

  await setDoc(inviteRef, {
    guildId,
    id: inviteId,
    expiration: '',
  });

  return inviteId;
};

type UseCreateInviteOptions = {
  onSuccess?: (inviteId: string) => void;
  onError?: (error: unknown) => void;
};

const useCreateInvite = ({
  onSuccess,
  onError,
}: UseCreateInviteOptions = {}) => {
  return useMutation(createInvite, {
    onSuccess,
    onError,
  });
};

export default useCreateInvite;
