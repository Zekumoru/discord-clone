import { useId, useState } from 'react';
import TextInput from '../../../../../pages/authentication/components/TextInput';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import { EmailAuthProvider, getAuth, linkWithCredential } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';
import LoadingScreen from '../../../../LoadingScreen';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import userDoc from '../../../../../types/user/firebase/userDoc';
import { setDoc } from 'firebase/firestore';
import { queryClient } from '../../../../QueryClientInitializer';

const UpgradeAccountModal = () => {
  const id = useId();
  const close = useCloseModal();
  const [firebaseUser] = useAuthState(getAuth());
  const [currentUser] = useCurrentUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  const handleSubmit = async () => {
    if (!firebaseUser || !currentUser) {
      toast.error('Could not upgrade account!');
      return;
    }

    setUpgradeLoading(true);
    try {
      const credential = EmailAuthProvider.credential(email, password);
      const userCredentials = await linkWithCredential(
        firebaseUser,
        credential
      );

      const userRef = userDoc(currentUser.id);
      await setDoc(userRef, {
        ...currentUser,
        email: userCredentials.user.email,
      });
      await queryClient.invalidateQueries(['user', 'current']);

      toast.success('Account upgraded successfully!');
      close();
    } catch (error) {
      console.error(error);
      toast.error('Could not upgrade account!');
    }

    setUpgradeLoading(false);
  };

  return (
    <div className="mb-4">
      {upgradeLoading && <LoadingScreen />}

      <div className="flex h-[56px] items-center px-4">
        <ModalChevronCloseButton>Account</ModalChevronCloseButton>
      </div>

      <div className="m-4">
        <h2 className="mb-2.5 mt-4 text-center text-xl font-bold">
          Upgrade your account
        </h2>
        <p className="mx-4 mb-5 text-center font-medium text-silvergrey-300">
          Upgrade your account to make it permanent!
        </p>
      </div>

      <form
        className="px-4"
        onSubmit={(e) => {
          handleSubmit();
          e.preventDefault();
        }}
      >
        <TextInput
          type="email"
          id={`email-${id}`}
          className="mb-5"
          label="Email"
          value={email}
          onChange={setEmail}
          hideAsterisk={true}
          required
        />

        <TextInput
          type="password"
          id={`password-${id}`}
          className="mb-6"
          value={password}
          label="Password"
          onChange={setPassword}
          minLength={8}
          maxLength={30}
          hideAsterisk={true}
          required
        />

        <button className="btn">Upgrade Account</button>
      </form>
    </div>
  );
};

export default UpgradeAccountModal;
