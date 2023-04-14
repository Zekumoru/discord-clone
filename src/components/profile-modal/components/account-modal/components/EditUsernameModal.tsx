import { useEffect, useRef, useState } from 'react';
import { ScreenModalMethods } from '../../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../../contexts/screen-modal/components/ScreenModalToolbar';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import { IconXMark } from '../../../../../assets/icons';

type EditUsernameModalProps = {
  close: ScreenModalMethods[1];
};

const EditUsernameModal = ({ close }: EditUsernameModalProps) => {
  const [user] = useCurrentUser();
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const [originalName, originalTagUnhashed] = extractNameAndTag(
    user?.username ?? ''
  );
  const originalTag = `#${originalTagUnhashed}`;
  const hasChanges = originalName !== name.trim() || originalTag !== tag;

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
    const username = `${name.trim()}${tag}`;
    console.log(username);
  };

  return (
    <div className="min-h-screen bg-background-300">
      <ScreenModalToolbar
        leftElement={
          <ModalChevronCloseButton close={close}>
            Account
          </ModalChevronCloseButton>
        }
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
      </ScreenModalToolbar>

      <div className="px-4 py-6">
        <div className="heading-2 mb-2">Username</div>

        <div className="flex items-center rounded bg-background-700 px-4 py-2.5 font-medium">
          <input
            ref={nameRef}
            type="text"
            value={name}
            className="min-w-0 flex-1 bg-transparent outline-none"
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
          <div
            onClick={handleClearName}
            className="grid h-5 w-5 place-content-center rounded-full bg-silvergrey-300"
          >
            <IconXMark
              strokeWidth={3}
              className="h-3.5 w-3.5 text-background-700"
            />
          </div>
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
