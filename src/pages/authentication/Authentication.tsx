import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Logo from './components/Logo';
import SignUp from './pages/SignUp';

const Authentication = () => {
  return (
    <div className="flex flex-col items-center px-4 py-5">
      <Logo className="mb-4 h-9" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Authentication;
