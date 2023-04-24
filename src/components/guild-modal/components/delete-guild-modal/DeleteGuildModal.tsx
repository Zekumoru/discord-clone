import { toast } from 'react-toastify';
import useGuild from '../../../../types/guild/hooks/useGuild';
import GuildPicture from '../../../GuildPicture';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import useDeleteGuild from '../../hooks/useDeleteGuild';
import LoadingScreen from '../../../LoadingScreen';
import { useState } from 'react';
import { useCloseModal } from '../../../../contexts/modal/ModalContext';
import { useNavigate } from 'react-router-dom';

type DeleteGuildModalProps = {
  guildId: string;
};

const DeleteGuildModal = ({ guildId }: DeleteGuildModalProps) => {
  const close = useCloseModal();
  const [guild] = useGuild(guildId);
  const [confirmInput, setConfirmInput] = useState('');
  const navigate = useNavigate();
  const { mutate: deleteGuild, isLoading } = useDeleteGuild({
    onSuccess: () => {
      toast.success('Server deleted successfully!');
      close(true);
      navigate('/channels/@me');
    },
    onError: () => toast.error('Error deleting server!'),
  });

  const handleDeleteGuild = () => {
    deleteGuild(guildId);
  };

  return (
    <div className="mb-4">
      {isLoading && <LoadingScreen />}

      <div className="flex h-[56px] items-center px-4">
        <ModalChevronCloseButton>Overview</ModalChevronCloseButton>
      </div>

      <form
        onSubmit={(e) => {
          handleDeleteGuild();
          e.preventDefault();
        }}
        className="p-4"
      >
        <h2 className="mb-2.5 mt-4 text-center text-xl font-bold">
          Delete {guild?.name}
        </h2>

        <GuildPicture
          className="mx-auto mb-6 mt-4 h-20 w-20 !rounded-3xl"
          guild={guild}
        />

        <p className="mx-4 mb-5 text-center font-medium text-silvergrey-300">
          Deleting this server <span className="font-bold">will remove</span>{' '}
          all its members access to it and this action{' '}
          <span className="font-bold">is not</span> irreversible!
        </p>

        <div className="heading-2 mb-2">Type "confirm" to delete server</div>
        <input
          type="text"
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          placeholder="Confirm"
          className="mb-6 w-full rounded bg-background-500 px-3 py-2.5 outline-none"
        />

        <p className="mx-4 mb-2.5 text-center font-bold text-silvergrey-300">
          Are you sure to delete {guild?.name}?
        </p>
        <button
          disabled={confirmInput.toLowerCase() !== 'confirm'}
          className="btn bg-salmon-700 py-2 font-bold disabled:bg-salmon-800"
        >
          Yes, delete server
        </button>
      </form>
    </div>
  );
};

export default DeleteGuildModal;
