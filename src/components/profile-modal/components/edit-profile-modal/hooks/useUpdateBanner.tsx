import { useMutation } from 'react-query';
import {
  UploadImageArgs,
  uploadImage,
} from '../../../../../hooks/useUploadImage';
import IUser from '../../../../../types/user/User';
import { setDoc } from 'firebase/firestore';
import userDoc from '../../../../../types/user/firebase/userDoc';
import { queryClient } from '../../../../QueryClientInitializer';

type UpdateBannerArgs = {
  user: IUser;
} & UploadImageArgs;

const updateBanner = async ({ image, path, user }: UpdateBannerArgs) => {
  const { url } = await uploadImage({ image, path });

  await setDoc(userDoc(user.id), {
    ...user,
    bannerUrl: url,
  });

  await queryClient.invalidateQueries(['user', 'current']);
};

type UseUpdateBannerProps = {
  onSuccess?: () => void;
};

const useUpdateBanner = ({ onSuccess }: UseUpdateBannerProps) => {
  return useMutation(updateBanner, {
    onSuccess,
  });
};

export default useUpdateBanner;
