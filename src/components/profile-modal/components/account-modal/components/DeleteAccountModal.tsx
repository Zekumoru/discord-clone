import { useState } from 'react';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import { toast } from 'react-toastify';
import {
  useAuthState,
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
import LoadingScreen from '../../../../LoadingScreen';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';
import useIsAnonymous from '../../../../../hooks/useIsAnonymous';

const DeleteAccountModal = () => {
  const close = useCloseModal();
  const [signInWithEmailAndPassword, _, signInLoading] =
    useSignInWithEmailAndPassword(getAuth());
  const [deleteUser, deleteLoading] = useDeleteUser(getAuth());
  const [user] = useCurrentUser();
  const isAnonymous = useIsAnonymous();
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

    await performBatch(async (batch) => {
      batch.delete(userDoc(user.id));
      batch.delete(userGuildsDoc(user.guildsId));
      batch.delete(userChatsDoc(user.userChatsId));
      batch.delete(friendsDoc(user.friendsId));
      batch.delete(friendRequestsDoc(user.friendRequestsId));
    });

    const success = await deleteUser();

    if (!success) {
      toast.error('Could not delete account!');
      return;
    }

    toast.success('Account deleted successfully!');
    close(true);
    navigate('/');
  };

  return (
    <div className="mb-4">
      {(signInLoading || deleteLoading) && <LoadingScreen />}

      <div className="flex h-[56px] items-center px-4">
        <ModalChevronCloseButton>Account</ModalChevronCloseButton>
      </div>

      <div className="mx-4 mt-4">
        <h2 className="mb-2.5 mt-4 text-center text-xl font-bold">
          Delete your account
        </h2>
        <p className="mx-4 mb-5 text-center font-medium text-silvergrey-300">
          {!isAnonymous ? (
            <>
              Deleting your account <span className="font-bold">does not</span>{' '}
              remove your past conversations and making a new account with the
              same email <span className="font-bold">does not</span> recover any
              of your past data.
            </>
          ) : (
            <>
              Anonymous accounts are{' '}
              <span className="font-bold">automatically deleted</span> after 30
              days.
            </>
          )}
        </p>
      </div>

      {!isAnonymous && (
        <form
          onSubmit={(e) => {
            handleDeleteAccount();
            e.preventDefault();
          }}
          className="px-4"
        >
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
      )}
    </div>
  );
};

export default DeleteAccountModal;
