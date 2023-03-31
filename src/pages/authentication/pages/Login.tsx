import { useId, useState } from 'react';
import TextInput from '../components/TextInput';
import { Link } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const Login = () => {
  const id = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(getAuth());

  const handleSubmit = () => {
    signInWithEmailAndPassword(email, password);
  };

  return (
    <>
      <div className="auth-title">Welcome back!</div>
      <div className="mb-5 text-silvergrey-300">
        We're so excited to see you again!
      </div>

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
          required
        />

        <TextInput
          type="password"
          id={`password-${id}`}
          className="mb-1.5"
          label="Password"
          value={password}
          minLength={8}
          maxLength={30}
          error={error?.code}
          onChange={setPassword}
          required
        />

        <a className="mb-5 inline-block text-sm font-medium text-dodgerblue-100">
          Forgot your password?
        </a>

        <button className="w-full rounded bg-warmblue-100 p-2.5 font-medium">
          Log In
        </button>

        <div className="mt-3 text-sm text-silvergrey-400">
          Need an account?{' '}
          <Link to="/signup" className="font-medium text-dodgerblue-100">
            Register
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
