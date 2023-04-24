import { useId, useState } from 'react';
import ModalCloseButton from '../../../../../../components/modal-utils/ModalCloseButton';
import { useModal } from '../../../../../../contexts/modal/ModalContext';
import CircledXButton from '../../../../../../components/CircledXButton';
import GuildPicturePicker from '../GuildPicturePicker';
import useCreateGuild from '../../hooks/useCreateGuild';
import { useCurrentUser } from '../../../../../../contexts/current-user/CurrentUserContext';
import { toast } from 'react-toastify';
import InviteModal from './InviteModal';
import useCreateInvite from '../../hooks/useCreateInvite';
import LoadingScreen from '../../../../../../components/LoadingScreen';

const CreateGuildModal = () => {
  const id = useId();
  const [user] = useCurrentUser();
  const [guildName, setGuildName] = useState('');
  const [guildPicture, setGuildPicture] = useState<File | null>(null);
  const [openModal] = useModal();
  const { mutate: createInvite, isLoading: createInviteLoading } =
    useCreateInvite({
      onSuccess: (inviteId) => {
        openModal(<InviteModal inviteId={inviteId} />);
      },
    });
  const { mutate: createGuild, isLoading: createGuildLoading } = useCreateGuild(
    {
      onSuccess: ({ guild, owner }) =>
        createInvite({
          guildId: guild.id,
          inviterId: owner.id,
        }),
    }
  );

  const handleCreateGuild = () => {
    if (!user) {
      toast.error('User is not logged in!');
      return;
    }

    createGuild({
      owner: user,
      name: guildName,
      picture: guildPicture,
    });
  };

  const clearGuildName = () => {
    setGuildName('');
  };

  return (
    <div className="mb-4">
      {(createGuildLoading || createInviteLoading) && <LoadingScreen />}

      <div className="flex h-[56px] items-center px-4">
        <ModalCloseButton />
      </div>

      <div className="p-4">
        <div className="heading-1 mb-2 capitalize">Create your server</div>
        <p className="mx-2.5 mb-4 text-center text-silvergrey-300">
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </p>

        <form
          onSubmit={(e) => {
            handleCreateGuild();
            e.preventDefault();
          }}
          className="mt-8"
        >
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
              required
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
