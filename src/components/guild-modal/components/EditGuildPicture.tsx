import { useId } from 'react';
import { IconImagePlus } from '../../../assets/icons';
import IGuild from '../../../types/guild/Guild';
import GuildPicture from '../../GuildPicture';
import { toast } from 'react-toastify';
import useUpdateGuildPicture from '../hooks/useUpdateGuildPicture';
import LoadingScreen from '../../LoadingScreen';

type EditGuildPictureProps = {
  guild: IGuild | undefined;
};

const EditGuildPicture = ({ guild }: EditGuildPictureProps) => {
  const id = useId();
  const { mutate: updateGuildPicture, isLoading } = useUpdateGuildPicture();

  const handleFileChange = (files: FileList | null) => {
    if (!guild || !files || !files[0]) {
      toast.error('Cannot load server image...');
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
      toast.error('Server image must be below 5 MB!');
      return;
    }

    updateGuildPicture({
      guild,
      path: `guild-pictures/${guild.id}/picture.${extension}`,
      image: file,
    });
  };

  return (
    <label htmlFor={`picture-picker-${id}`} className="relative inline-block">
      {isLoading && <LoadingScreen />}

      <div className="absolute right-0.5 top-0.5 grid h-8 w-8 place-content-center rounded-full bg-silvergrey-100 bg-opacity-80">
        <input
          type="file"
          accept="images/*"
          id={`picture-picker-${id}`}
          className="absolute h-0 w-0"
          onChange={(e) => {
            handleFileChange(e.target.files);
            e.target.value = '';
          }}
        />

        <IconImagePlus
          className="h-5 w-5 text-background-500"
          strokeWidth={2}
        />
      </div>
      <GuildPicture guild={guild} className="h-20 w-20 !rounded-3xl" />
    </label>
  );
};

export default EditGuildPicture;
