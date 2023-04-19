import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
import Channels from './pages/channels/Channels';
import Invite from './pages/invite/Invite';
import ScreenModalProvider from './contexts/screen-modal/ScreenModalContext';
import CurrentUserProvider from './contexts/current-user/CurrentUserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div className="App overflow-x-hidden">
      <CurrentUserProvider>
        <ScreenModalProvider>
          <Routes>
            <Route path="/*" element={<Authentication />} />
            <Route path="/invite/:id" element={<Invite />} />
            <Route path="/channels/*" element={<Channels />} />
          </Routes>
        </ScreenModalProvider>
        <ToastContainer
          toastClassName="bg-background-700 text-silvergrey-300"
          autoClose={2000}
          hideProgressBar
        />
      </CurrentUserProvider>
    </div>
  );
}

export default App;
