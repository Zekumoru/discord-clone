import { useId, useState } from 'react';
import TextInput from '../components/TextInput';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const id = useId();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="auth-title mb-7">Create an account</div>

      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextInput
          type="email"
          id={`email-${id}`}
          className="mb-5"
          value={email}
          onChange={setEmail}
          required
          labelContent="Email"
        />

        <TextInput
          type="text"
          id={`username-${id}`}
          className="mb-5"
          value={username}
          onChange={setUsername}
          minLength={3}
          maxLength={32}
          required
          labelContent="Username"
        />

        <TextInput
          type="password"
          id={`password-${id}`}
          className="mb-6"
          value={password}
          onChange={setPassword}
          minLength={8}
          maxLength={30}
          required
          labelContent="Password"
        />

        <button className="w-full rounded bg-warmblue-100 p-2.5 font-medium">
          Sign Up
        </button>

        <Link
          to="/"
          className="mt-3 block text-sm font-medium text-dodgerblue-100"
        >
          Already have an account?
        </Link>
      </form>
    </>
  );
};

export default SignUp;
