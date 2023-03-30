import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Logo from './components/Logo';

const Authentication = () => {
  return (
    <div className="flex flex-col items-center px-4 py-5">
      <Logo className="h-9 mb-4" />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Authentication;
