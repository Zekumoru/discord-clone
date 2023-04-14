import { useState } from 'react';
import { ScreenModalMethods } from '../../../../../contexts/screen-modal/ScreenModalContext';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import { toast } from 'react-toastify';
import {
  useDeleteUser,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import performBatch from '../../../../../utils/performBatch';
import userDoc from '../../../../../types/user/firebase/userDoc';
import userGuildsDoc from '../../../../../types/user/firebase/userGuildsDoc';
import userChatsDoc from '../../../../../types/user-chat/firebase/userChatsDoc';
import friendsDoc from '../../../../../types/friend/firebase/friendsDoc';
import friendRequestsDoc from '../../../../../types/friend/firebase/friendRequestsDoc';
import { useNavigate } from 'react-router-dom';

type DeleteAccountModalProps = {
  close: ScreenModalMethods[1];
};

const DeleteAccountModal = ({ close }: DeleteAccountModalProps) => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(getAuth());
  const [deleteUser] = useDeleteUser(getAuth());
  const [user] = useCurrentUser();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!user) {
      toast.error('User is not logged in!');
      return;
    }

    const userCredentials = await signInWithEmailAndPassword(
      user.email,
      password
    );

    if (!userCredentials?.user) {
      toast.error('Could not delete account!');
      return;
    }

    const success = await deleteUser();
    if (!success) {
      toast.error('Could not delete account!');
      return;
    }

    await performBatch(async (batch) => {
      batch.delete(userDoc(user.id));
      batch.delete(userGuildsDoc(user.guildsId));
      batch.delete(userChatsDoc(user.userChatsId));
      batch.delete(friendsDoc(user.friendsId));
      batch.delete(friendRequestsDoc(user.friendRequestsId));
    });

    toast.success('Account deleted successfully!');
    close(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background-300">
      <div className="flex h-[56px] items-center px-4">
        <ModalChevronCloseButton close={close}>Account</ModalChevronCloseButton>
      </div>

      <form
        onSubmit={(e) => {
          handleDeleteAccount();
          e.preventDefault();
        }}
        className="p-4"
      >
        <h2 className="mb-2.5 mt-4 text-center text-xl font-bold">
          Delete your account
        </h2>
        <p className="mx-4 mb-5 text-center font-medium text-silvergrey-300">
          Deleting your account <span className="font-bold">does not</span>{' '}
          remove your past conversations and making a new account with the same
          email <span className="font-bold">does not</span> recover any of your
          past data.
        </p>

        <div className="heading-2 mb-2">Confirm your password</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          maxLength={30}
          className="mb-6 w-full rounded bg-background-500 px-3 py-2.5 outline-none"
        />

        <p className="mx-4 mb-2.5 text-center font-bold text-silvergrey-300">
          Are you sure to leave? :(
        </p>
        <button
          className="btn bg-salmon-700 py-2 font-bold disabled:bg-salmon-800"
          disabled={password.length < 8}
        >
          Yes, delete account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountModal;
