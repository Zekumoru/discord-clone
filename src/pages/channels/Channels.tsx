import { Route, Routes, useNavigate } from 'react-router-dom';
import Friends from './pages/friends/Friends';
import PartialScreenModalProvider from '../../contexts/partial-screen-modal/PartialScreenModalContext';
import SidebarProvider from '../../contexts/sidebar/SidebarContext';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import { useEffect } from 'react';
import Channel from './Channel';
import Guild from './pages/guilds/Guild';
import MembersSliderProvider from '../../contexts/members-slider/MembersSliderContext';
import FriendChat from './pages/chat/FriendChat';
import SwipeListenerProvider from '../../contexts/SwipeListenerContext';

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
        <MembersSliderProvider>
          <SwipeListenerProvider enabledSidebarSwiping>
            <Routes>
              <Route path="/@me" element={<Friends />} />
              <Route path="/@me/:id" element={<FriendChat />} />
              <Route path="/:guildId" element={<Guild />} />
              <Route path="/:guildId/:channelId" element={<Channel />} />
            </Routes>
          </SwipeListenerProvider>
        </MembersSliderProvider>
      </SidebarProvider>
    </PartialScreenModalProvider>
  );
};

export default Channels;
