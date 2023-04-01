import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import UsernameInput from './components/UsernameInput';
import AddFriendModalToolbar from './components/AddFriendModalToolbar';
import { ScreenModalMethods } from '../../../../contexts/screen-modal/ScreenModal';

type AddFriendScreenModalProps = {
  close: ScreenModalMethods[1];
};

const AddFriendScreenModal = ({ close }: AddFriendScreenModalProps) => {
  const [username, setUsername] = useState('');
  const [user] = useAuthState(getAuth());

  const handleSubmit = () => {
    console.log('Sending friend request...');
    close();
  };

  return (
    <div className="min-h-screen bg-background-300">
      <AddFriendModalToolbar close={close} />

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
          <UsernameInput
            username={username}
            placeholder="Username#0000"
            onChange={setUsername}
            required
          />
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
