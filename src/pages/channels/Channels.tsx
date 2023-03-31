import { Route, Routes } from 'react-router-dom';
import Friends from './pages/friends/Friends';

const Channels = () => {
  return (
    <div>
      <Routes>
        <Route path="/@me" element={<Friends />} />
      </Routes>
    </div>
  );
};

export default Channels;
