import { useMutation } from 'react-query';
import inviteDoc from '../../../../../types/invite/firebase/inviteDoc';
import generateInviteId from '../../../../../utils/generateInviteId';
import { setDoc } from 'firebase/firestore';

type CreateInviteOptions = {
  guildId: string;
  inviterId: string;
};

const createInvite = async ({ guildId, inviterId }: CreateInviteOptions) => {
  const inviteId = generateInviteId();
  const inviteRef = inviteDoc(inviteId);

  await setDoc(inviteRef, {
    guildId,
    inviterId,
    id: inviteId,
    expiration: '',
  });

  return { guildId, inviteId };
};

type UseCreateInviteOptions = {
  onSuccess?: (data: Awaited<ReturnType<typeof createInvite>>) => void;
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
