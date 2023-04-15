import { useMutation } from 'react-query';
import {
  UploadImageArgs,
  uploadImage,
} from '../../../../../hooks/useUploadImage';
import IUser from '../../../../../types/user/User';
import { setDoc } from 'firebase/firestore';
import userDoc from '../../../../../types/user/firebase/userDoc';
import { queryClient } from '../../../../QueryClientInitializer';

type UpdatePictureArgs = {
  user: IUser;
} & UploadImageArgs;

const updatePicture = async ({ image, path, user }: UpdatePictureArgs) => {
  const { url } = await uploadImage({ image, path });

  await setDoc(userDoc(user.id), {
    ...user,
    pictureUrl: url,
  });

  await queryClient.invalidateQueries(['user', 'current']);
};

type UseUpdatePictureProps = {
  onSuccess?: () => void;
};

const useUpdatePicture = ({ onSuccess }: UseUpdatePictureProps) => {
  return useMutation(updatePicture, {
    onSuccess,
  });
};

export default useUpdatePicture;
