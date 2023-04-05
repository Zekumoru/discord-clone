import { Route, Routes } from 'react-router-dom';
import Friends from './pages/friends/Friends';
import Chat from './pages/chat/Chat';

const Channels = () => {
  return (
    <div>
      <Routes>
        <Route path="/@me" element={<Friends />} />
        <Route path="/@me/:id" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default Channels;
