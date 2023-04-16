import { Route, Routes, useNavigate } from 'react-router-dom';
import Friends from './pages/friends/Friends';
import Chat from './pages/chat/Chat';
import PartialScreenModalProvider from '../../contexts/partial-screen-modal/PartialScreenModalContext';
import SidebarProvider from '../../contexts/sidebar/SidebarContext';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import { useEffect } from 'react';

const Channels = () => {
  const [user, loading] = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) return;

    navigate('/');
  }, [user, loading]);

  return (
    <PartialScreenModalProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/@me" element={<Friends />} />
          <Route path="/@me/:id" element={<Chat />} />
        </Routes>
      </SidebarProvider>
    </PartialScreenModalProvider>
  );
};

export default Channels;
