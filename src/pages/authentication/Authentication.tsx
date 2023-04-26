import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Logo from './components/Logo';
import SignUp from './pages/SignUp';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import { useEffect } from 'react';
import AnonymousLogin from './pages/AnonymousLogin';

const Authentication = () => {
  const [currentUser] = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    navigate('/channels/@me');
  }, [currentUser]);

  return (
    <div className="flex flex-col items-center px-4 py-5">
      <Logo className="mb-4 h-9" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/anonymous" element={<AnonymousLogin />} />
      </Routes>
    </div>
  );
};

export default Authentication;
