import { useEffect, useId, useState } from 'react';
import TextInput from '../components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import LoadingScreen from '../../../components/LoadingScreen';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const Login = () => {
  const id = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, _user, signInLoading, error] =
    useSignInWithEmailAndPassword(getAuth());
  const [sendPasswordResetEmail, resetLoading, resetError] =
    useSendPasswordResetEmail(getAuth());
  const navigate = useNavigate();

  useEffect(() => {
    if (!resetError) return;

    toast.error('Could not send reset email!');
  }, [resetError]);

  const handleSubmit = async () => {
    const response = await signInWithEmailAndPassword(email, password);
    if (response?.user) {
      navigate('/channels/@me');
    }
  };

  const handleResetPassword = async () => {
    if (email === '') {
      toast.error('Email field is empty!');
      return;
    }

    if (!email.match(EMAIL_REGEX)) {
      toast.error('Invalid email!');
      return;
    }

    const success = await sendPasswordResetEmail(email);

    if (success) {
      toast.success('Reset email sent!');
    }
  };

  return (
    <>
      {(signInLoading || resetLoading) && <LoadingScreen />}

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

        <a
          onClick={handleResetPassword}
          className="mb-5 inline-block text-sm font-medium text-dodgerblue-100"
        >
          Forgot your password?
        </a>

        <button className="btn">Log In</button>

        <div className="mt-3 text-sm text-silvergrey-400">
          Need an account?{' '}
          <Link to="/signup" className="font-medium text-dodgerblue-100">
            Register
          </Link>
        </div>

        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 border-b border-silvergrey-800" />
          <div className="heading-2 font-semibold text-silvergrey-400">or</div>
          <div className="flex-1 border-b border-silvergrey-800" />
        </div>

        <button
          type="button"
          className="btn bg-silvergrey-800"
          onClick={() => navigate('/anonymous')}
        >
          Sign In Anonymously
        </button>
      </form>
    </>
  );
};

export default Login;
