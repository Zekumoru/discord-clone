import { useId, useState } from 'react';
import TextInput from '../components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth, updateProfile } from 'firebase/auth';
import initUserCollections from './utils/initUserCollections';
import generateTag from './utils/generateTag';
import LoadingScreen from '../../../components/LoadingScreen';

const SignUp = () => {
  const id = useId();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, _user, loading, error] =
    useCreateUserWithEmailAndPassword(getAuth());
  const navigate = useNavigate();

  const handleUsernameChange = (username: string) => {
    const unhashedUsername = username.replaceAll('#', '');
    setUsername(unhashedUsername);
  };

  const handleSubmit = async () => {
    const response = await createUserWithEmailAndPassword(email, password);
    if (response?.user) {
      const taggedUsername = `${username.trim()}#${generateTag()}`;
      await updateProfile(response.user, { displayName: taggedUsername });
      await initUserCollections(response.user, taggedUsername);
      navigate('/channels/@me');
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}

      <div className="auth-title mb-7">Create an account</div>

      <form
        className="w-full"
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
          error={error?.code}
          onChange={setEmail}
          hideAsterisk={true}
          required
        />

        <TextInput
          type="text"
          id={`username-${id}`}
          className="mb-5"
          value={username}
          label="Username"
          onChange={handleUsernameChange}
          minLength={3}
          maxLength={32}
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

        <button className="btn">Sign Up</button>

        <Link
          to="/"
          className="mt-3 inline-block text-sm font-medium text-dodgerblue-100"
        >
          Already have an account?
        </Link>
      </form>
    </>
  );
};

export default SignUp;
