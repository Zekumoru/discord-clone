import { useId, useState } from 'react';
import ModalCloseButton from '../../../../../../../components/modal-utils/ModalCloseButton';
import { ScreenModalProps } from '../../../../../../../contexts/screen-modal/ScreenModalContext';
import CircledXButton from '../../../../../../../components/CircledXButton';
import GuildPicturePicker from './GuildPicturePicker';

const CreateGuildModal = ({ close }: ScreenModalProps) => {
  const id = useId();
  const [guildName, setGuildName] = useState('');
  const [guildPicture, setGuildPicture] = useState<File>();

  const clearGuildName = () => {
    setGuildName('');
  };

  return (
    <div className="min-h-screen bg-background-300">
      <div className="flex h-[56px] items-center px-4">
        <ModalCloseButton close={close} />
      </div>

      <div className="p-4">
        <div className="heading-1 mb-2 capitalize">Create your server</div>
        <p className="mx-2.5 mb-4 text-center text-silvergrey-300">
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </p>

        <form className="mt-8">
          <GuildPicturePicker onPick={setGuildPicture} />

          <label className="heading-2 mb-2 block" htmlFor={`server-name-${id}`}>
            Server name
          </label>
          <div className="mb-4 flex gap-2 rounded bg-background-700 px-4 py-3 leading-none">
            <input
              type="text"
              id={`server-name-${id}`}
              value={guildName}
              onChange={(e) => setGuildName(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
              minLength={3}
              maxLength={32}
            />
            <CircledXButton onClick={clearGuildName} />
          </div>

          <button className="btn font-semibold">Create server</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGuildModal;
