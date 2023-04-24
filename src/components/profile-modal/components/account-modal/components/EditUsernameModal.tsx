import { useEffect, useRef, useState } from 'react';
import ModalToolbar from '../../../../../contexts/modal/components/ModalToolbar';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import useUpdateUsername from '../hooks/useUpdateUsername';
import LoadingScreen from '../../../../LoadingScreen';
import DiscordError from '../../../../../utils/DiscordError';
import { toast } from 'react-toastify';
import CircledXButton from '../../../../CircledXButton';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';

const EditUsernameModal = () => {
  const close = useCloseModal();
  const [user] = useCurrentUser();
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const [originalName, originalTagUnhashed] = extractNameAndTag(
    user?.username ?? ''
  );
  const originalTag = `#${originalTagUnhashed}`;
  const hasChanges = originalName !== name.trim() || originalTag !== tag;
  const { mutate: updateUsername, isLoading } = useUpdateUsername({
    onSuccess: close,
    onError: (error) => {
      if (!(error instanceof DiscordError)) {
        toast.error('An unknown error has occurred!');
        return;
      }

      if (error.code === 'username-taken') {
        toast.error('Username is already taken!');
      } else {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (!user) return;

    setName(originalName);
    setTag(originalTag);
  }, [user]);

  const handleNameChange = (name: string) => {
    setName(name.replaceAll('#', ''));
  };

  const handleTagChange = (tag: string) => {
    if (!tag.match(/^#\d*$/)) {
      return;
    }

    setTag(tag);
  };

  const handleClearName = () => {
    setName('');
    nameRef.current?.focus();
  };

  const handleSave = () => {
    updateUsername({
      user: user!,
      newUsername: `${name.trim()}${tag}`,
    });
  };

  return (
    <div className="mb-4">
      {isLoading && <LoadingScreen />}

      <ModalToolbar
        leftElement={<ModalChevronCloseButton>Account</ModalChevronCloseButton>}
        rightElement={
          hasChanges &&
          name.trim() &&
          tag.length === 5 && (
            <div onClick={handleSave} className="font-medium text-white">
              Save
            </div>
          )
        }
      >
        Edit Username
      </ModalToolbar>

      <div className="px-4 py-6">
        <div className="heading-2 mb-2">Username</div>

        <div className="flex items-center rounded bg-background-700 px-4 py-2.5 font-medium">
          <input
            ref={nameRef}
            type="text"
            value={name}
            maxLength={32}
            className="min-w-0 flex-1 bg-transparent outline-none"
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
          <CircledXButton onClick={handleClearName} />
          <div className="mx-3 h-6 border-l-2 border-background-300" />
          <input
            type="text"
            value={tag}
            maxLength={5}
            className="w-20 min-w-0 bg-transparent outline-none"
            onChange={(e) => handleTagChange(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default EditUsernameModal;
