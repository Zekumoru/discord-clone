import { Route, Routes, useNavigate } from 'react-router-dom';
import Friends from './pages/friends/Friends';
import Chat from './pages/chat/Chat';
import PartialScreenModalProvider from '../../contexts/partial-screen-modal/PartialScreenModalContext';
import SidebarProvider from '../../contexts/sidebar/SidebarContext';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import { useEffect } from 'react';
import Channel from './Channel';
import Guild from './pages/guilds/Guild';

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
          <Route path="/:guildId" element={<Guild />} />
          <Route path="/:guildId/:channelId" element={<Channel />} />
        </Routes>
      </SidebarProvider>
    </PartialScreenModalProvider>
  );
};

export default Channels;
