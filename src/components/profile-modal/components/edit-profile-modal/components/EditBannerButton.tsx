import { useId } from 'react';
import { toast } from 'react-toastify';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import { IconPencil } from '../../../../../assets/icons';
import useUpdateBanner from '../hooks/useUpdateBanner';
import LoadingScreen from '../../../../LoadingScreen';

const EditBannerButton = () => {
  const id = useId();
  const [user] = useCurrentUser();
  const { mutate: updateBanner, isLoading } = useUpdateBanner({
    onSuccess: () => {
      toast.success('Banner set successfully!');
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (!user || !files || !files[0]) {
      toast.error('Cannot load banner image...');
      return;
    }

    const file = files[0];
    const [type, extension] = file.type.split('/');
    if (!type.match('image')) {
      toast.error('File must be an image!');
      return;
    }

    // limit image to 5 MB
    if (file.size / 1024 / 1024 > 5) {
      toast.error('Banner image must be below 5 MB!');
      return;
    }

    updateBanner({
      user: user!,
      path: `banners/${user.id}/banner.${extension}`,
      image: file,
    });
  };

  return (
    <label
      htmlFor={`banner-picker-${id}`}
      className="absolute right-4 top-3 rounded-full bg-background-800 p-1.5 text-silvergrey-300"
    >
      {isLoading && <LoadingScreen />}

      <input
        type="file"
        accept="images/*"
        id={`banner-picker-${id}`}
        className="absolute h-0 w-0"
        onChange={async (e) => {
          handleFileChange(e.target.files);
          e.target.value = '';
        }}
      />
      <IconPencil className="relative -left-[0.5px] h-4 w-4" />
    </label>
  );
};

export default EditBannerButton;
