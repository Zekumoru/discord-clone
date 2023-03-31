import { useState } from 'react';
import ScreenModalToolbar from '../../../contexts/screen-modal/components/ScreenModalToolbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

type AddFriendScreenModalProps = {
  close: () => void;
};

const AddFriendScreenModal = ({ close }: AddFriendScreenModalProps) => {
  const [username, setUsername] = useState('');
  const [user] = useAuthState(getAuth());

  const handleUsernameChange = (value: string) => {
    const tagLength = value.match(/#\d*$/)?.[0].length ?? 0;
    if (tagLength > 5 || value.length > 32 + tagLength) return;
    if (!tagLength && value.includes('#')) return;

    setUsername(value);
  };

  const handleSubmit = () => {
    console.log('Sending friend request...');
    close();
  };

  let previewTag = '#0000';
  const match = username.match(/#\d*/)?.[0];
  if (match) {
    previewTag = match.padEnd(5, '0').substring(match.length);
  }

  return (
    <div className="min-h-screen bg-background-300">
      <ScreenModalToolbar
        leftElement={
          <button className="font-medium" onClick={close}>
            Close
          </button>
        }
      >
        Add Friend
      </ScreenModalToolbar>

      <div className="mb-1 mt-2 p-4">
        <h1 className="text-center text-2xl font-bold">
          Add your friend on Discord
        </h1>
        <p className="px-2 text-center text-silvergrey-300">
          You will need both their username and a tag. Keep in mind that
          username is case sensitive.
        </p>

        <form
          className="flex flex-col"
          onSubmit={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
        >
          <h2 className="heading-2 mb-2 mt-4">Add via username</h2>
          <div className="relative w-full">
            <div className="absolute top-[-1px]  p-2.5">
              <span className="text-transparent">{username}</span>
              {username && (
                <span className="text-silvergrey-300">{previewTag}</span>
              )}
            </div>
            <input
              type="text"
              className="text-input w-full text-white"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="Username#0000"
              required
            />
          </div>
          <div className="mt-2 text-sm text-silvergrey-300">
            Your username is {user?.displayName}
          </div>

          <button className="btn my-4 py-2 text-sm font-semibold">
            Send Friend Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFriendScreenModal;
