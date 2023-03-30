import { useState } from 'react';
import TextInput from './TextInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="text-2xl font-semibold mb-1.5">Welcome back!</div>
      <div className="text-silvergrey-300 mb-5">
        We're so excited to see you again!
      </div>

      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextInput
          type="email"
          className="mb-5"
          value={email}
          onChange={setEmail}
          required
          labelContent={
            <>
              Email <span className="text-crimson-100 ml-0.5">*</span>
            </>
          }
        />

        <TextInput
          type="password"
          className="mb-1.5"
          value={password}
          onChange={setPassword}
          minLength={8}
          maxLength={30}
          required
          labelContent={
            <>
              Password <span className="text-crimson-100 ml-0.5">*</span>
            </>
          }
        />

        <a className="text-dodgerblue-100 text-sm mb-5 font-medium block">
          Forgot your password?
        </a>

        <button className="w-full bg-warmblue-100 rounded font-medium p-2.5">
          Log In
        </button>

        <div className="text-sm text-silvergrey-400 mt-3">
          Need an account?{' '}
          <a className="font-medium text-dodgerblue-100">Register</a>
        </div>
      </form>
    </>
  );
};

export default Login;
