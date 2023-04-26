import { useId, useState } from 'react';
import TextInput from '../components/TextInput';
import { getAuth, signInAnonymously, updateProfile } from 'firebase/auth';
import initUserCollections from './utils/initUserCollections';
import { useNavigate } from 'react-router-dom';
import generateTag from './utils/generateTag';
import { FirebaseError } from 'firebase/app';
import LoadingScreen from '../../../components/LoadingScreen';

const AnonymousLogin = () => {
  const id = useId();
  const [username, setUsername] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleUsernameChange = (username: string) => {
    const unhashedUsername = username.replaceAll('#', '');
    setUsername(unhashedUsername);
  };

  const handleSubmit = async () => {
    setSignInLoading(true);
    setErrorCode(undefined);

    try {
      const response = await signInAnonymously(getAuth());

      if (response.user) {
        const taggedUsername = `${username}#${generateTag()}`;
        await updateProfile(response.user, { displayName: taggedUsername });
        await initUserCollections(response.user, taggedUsername);
        navigate('/channels/@me');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorCode(error.code);
      } else {
        setErrorCode('internal-error');
      }
    }

    setSignInLoading(false);
  };

  return (
    <>
      {signInLoading && <LoadingScreen />}

      <div className="auth-title mx-4 text-center">
        Create an anonymous account
      </div>
      <div className="mx-4 mb-5 text-center text-silvergrey-300">
        To start tasting the power of Discord with an anonymous account*, enter
        an awesome username**!
      </div>

      <form
        className="w-full"
        onSubmit={(e) => {
          handleSubmit();
          e.preventDefault();
        }}
      >
        <TextInput
          type="text"
          id={`username-${id}`}
          className="mb-5"
          value={username}
          error={errorCode}
          label="Username"
          onChange={handleUsernameChange}
          minLength={3}
          maxLength={32}
          hideAsterisk={true}
          required
        />

        <button className="btn">Sign In Anonymously</button>
      </form>

      <div className="more-info">
        <div className="asterisk">*</div>
        <div className="more-info-paragraphs">
          <p>
            You can always upgrade your account later in the account settings.
          </p>

          <p>
            Upgrading an account means turning an anonymous account into a
            full-fledged account with an email and password.
          </p>

          <p className="font-semibold">
            Anonymous accounts are automatically deleted after 30 days.
          </p>
        </div>
      </div>

      <div className="more-info">
        <div className="asterisk">**</div>
        <div className="more-info-paragraphs">
          <p className="font-semibold">
            Username tags are automatically generated.
          </p>

          <p>
            You can always change your username and your tag later in the
            account settings.
          </p>
        </div>
      </div>
    </>
  );
};

export default AnonymousLogin;
