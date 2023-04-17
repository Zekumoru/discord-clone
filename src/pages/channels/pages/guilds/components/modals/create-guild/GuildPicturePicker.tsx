import { useId, useState } from 'react';
import { toast } from 'react-toastify';
import { IconCamera } from '../../../../../../../assets/icons';

type GuildPicturePickerProps = {
  onPick: (image: File) => void;
};

const GuildPicturePicker = ({ onPick }: GuildPicturePickerProps) => {
  const id = useId();
  const [picturePreview, setPicturePreview] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleFileChange = (files: FileList | null) => {
    if (!files || !files[0]) {
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

    const reader = new FileReader();
    reader.onload = () => {
      setPicturePreview(reader.result);
    };
    reader.readAsDataURL(file);

    onPick(file);
  };

  return (
    <label
      htmlFor={`guild-picture-picker-${id}`}
      className={`relative mx-auto mb-4 flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center gap-0.5 rounded-full border-[2.5px] border-dashed bg-cover bg-center bg-no-repeat text-silvergrey-300 ${
        picturePreview ? 'border-transparent' : 'border-silvergrey-300'
      }`}
      style={{
        backgroundImage: `url(${picturePreview})`,
      }}
    >
      <input
        type="file"
        accept="images/*"
        id={`guild-picture-picker-${id}`}
        className="absolute h-0 w-0"
        onChange={async (e) => {
          handleFileChange(e.target.files);
          e.target.value = '';
        }}
      />

      <div className="absolute -right-2 -top-2 grid h-8 w-8 place-content-center rounded-full bg-warmblue-100 text-3xl leading-none text-white">
        +
      </div>

      {!picturePreview && (
        <>
          <IconCamera className="h-7 w-7" />
          <div className="text-sm font-bold uppercase">Upload</div>
        </>
      )}
    </label>
  );
};

export default GuildPicturePicker;
