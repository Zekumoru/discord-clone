import { Route, Routes } from 'react-router-dom';
import Friends from './pages/friends/Friends';
import Chat from './pages/chat/Chat';
import PartialScreenModalProvider from '../../contexts/partial-screen-modal/PartialScreenModalContext';

const Channels = () => {
  return (
    <PartialScreenModalProvider>
      <Routes>
        <Route path="/@me" element={<Friends />} />
        <Route path="/@me/:id" element={<Chat />} />
      </Routes>
    </PartialScreenModalProvider>
  );
};

export default Channels;
