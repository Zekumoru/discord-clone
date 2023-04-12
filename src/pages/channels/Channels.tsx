import { Route, Routes } from 'react-router-dom';
import Friends from './pages/friends/Friends';
import Chat from './pages/chat/Chat';
import PartialScreenModalProvider from '../../contexts/partial-screen-modal/PartialScreenModalContext';
import SidebarProvider from '../../contexts/sidebar/SidebarContext';

const Channels = () => {
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
