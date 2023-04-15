import { useMutation } from 'react-query';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

type UploadImageArgs = {
  image: File;
  path: string;
};

const uploadImage = async ({ image, path }: UploadImageArgs) => {
  const imageRef = ref(getStorage(), path);
  const imageSnapshot = await uploadBytesResumable(imageRef, image);
  const publicImageUrl = await getDownloadURL(imageRef);

  return {
    snapshot: imageSnapshot,
    url: publicImageUrl,
  };
};

type UseUploadImageProps = {
  onSuccess?: (
    data: Awaited<ReturnType<typeof uploadImage>>
  ) => void | Promise<void>;
};

const useUploadImage = ({ onSuccess }: UseUploadImageProps = {}) => {
  return useMutation(uploadImage, {
    onSuccess,
  });
};

export default useUploadImage;
export { uploadImage };
export type { UploadImageArgs };
