import { useState } from 'react';
import UsernameInput from './components/UsernameInput';
import AddFriendModalToolbar from './components/AddFriendModalToolbar';
import { ScreenModalMethods } from '../../../../../../contexts/screen-modal/ScreenModalContext';
import useSendFriendRequest from './hooks/use-add-friend/useSendFriendRequest';
import { useCurrentUser } from '../../../../../../contexts/current-user/CurrentUserContext';
import DiscordError from '../../../../../../utils/DiscordError';
import { toast } from 'react-toastify';
import LoadingScreen from '../../../../../../components/LoadingScreen';

type AddFriendScreenModalProps = {
  close: ScreenModalMethods[1];
};

const AddFriendScreenModal = ({ close }: AddFriendScreenModalProps) => {
  const [username, setUsername] = useState('');
  const [user] = useCurrentUser();
  const { mutate: addFriend, isLoading } = useSendFriendRequest({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      if (!(error instanceof DiscordError)) {
        toast.error('An unknown error has occurred.');
        return;
      }

      switch (error.code) {
        case 'action-on-self': {
          toast.error('You cannot add yourself!');
          break;
        }
        case 'already-sent': {
          toast.error('Request already sent!');
          break;
        }
        case 'user-not-found': {
          toast.error('User not found!');
          break;
        }
        default: {
          toast.error(error.message);
        }
      }
    },
  });

  const handleSubmit = () => {
    let taggedUsername: string;

    const tag = username.match(/#\d*$/)?.[0];
    if (tag === undefined) {
      taggedUsername = username.concat('#0000');
    } else {
      const totalLength = username.length + (5 - tag.length);
      taggedUsername = username.padEnd(totalLength, '0');
    }

    if (!taggedUsername.match(/^[^#]*#\d{4}$/)?.[0]) {
      toast.error('Invalid username!');
      return;
    }

    addFriend(taggedUsername);
  };

  return (
    <div className="min-h-screen bg-background-300">
      {isLoading && <LoadingScreen />}

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
            Your username is {user?.username}
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
