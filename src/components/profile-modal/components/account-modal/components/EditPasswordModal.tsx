import { useEffect, useState } from 'react';
import { ScreenModalMethods } from '../../../../../contexts/screen-modal/ScreenModalContext';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import {
  useSignInWithEmailAndPassword,
  useUpdatePassword,
} from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';

type EditPasswordModalProps = {
  close: ScreenModalMethods[1];
};

const EditPasswordModal = ({ close }: EditPasswordModalProps) => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(getAuth());
  const [updatePassword] = useUpdatePassword(getAuth());
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useCurrentUser();

  const handleUpdatePassword = async () => {
    if (!user) {
      toast.error('User must be signed in!');
      return;
    }

    const userCredentials = await signInWithEmailAndPassword(
      user.email,
      currentPassword
    );

    if (!userCredentials?.user) {
      toast.error('Could not update password!');
      return;
    }

    const success = await updatePassword(password);

    if (!success) {
      toast.error('Could not update password!');
      return;
    }

    toast.success('Password updated successfully!');
    close();
  };

  return (
    <div className="min-h-screen bg-background-300">
      <div className="flex h-[56px] items-center px-4">
        <ModalChevronCloseButton close={close}>Account</ModalChevronCloseButton>
      </div>

      <form
        className="p-4"
        onSubmit={(e) => {
          handleUpdatePassword();
          e.preventDefault();
        }}
      >
        <h2 className="mb-2.5 mt-4 text-center text-xl font-bold">
          Update your password
        </h2>
        <p className="mx-4 mb-5 text-center font-medium text-silvergrey-300">
          Please enter your existing password and your new password.
        </p>

        <div className="heading-2 mb-2">Current Password</div>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          minLength={8}
          maxLength={30}
          className="mb-6 w-full rounded bg-background-500 px-3 py-2.5 outline-none"
        />

        <div className="heading-2 mb-2">New Password</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          maxLength={30}
          className="w-full rounded bg-background-500 px-3 py-2.5 outline-none"
        />

        <button
          className="btn mt-4 py-2 font-semibold"
          disabled={password.length < 8}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default EditPasswordModal;
