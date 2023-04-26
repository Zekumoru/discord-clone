import { getAuth, signInAnonymously, updateProfile } from 'firebase/auth';
import { nanoid } from 'nanoid';
import generateTag from '../pages/utils/generateTag';
import { useNavigate } from 'react-router-dom';
import initUserCollections from '../pages/utils/initUserCollections';

const SignInAnonymouslyButton = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const response = await signInAnonymously(getAuth());

    if (response.user) {
      const username = `anon-${nanoid(10)}#${generateTag()}`;
      await updateProfile(response.user, { displayName: username });
      await initUserCollections(response.user, username);
      navigate('/channels/@me');
    }
  };

  return (
    <button
      type="button"
      className="btn bg-silvergrey-800"
      onClick={handleSignIn}
    >
      Sign In Anonymously
    </button>
  );
};

export default SignInAnonymouslyButton;
