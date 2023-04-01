import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
import Channels from './pages/channels/Channels';
import ScreenModalProvider from './contexts/screen-modal/ScreenModal';
import CurrentUserProvider from './contexts/current-user/CurrentUserContext';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <ScreenModalProvider>
          <Routes>
            <Route path="/*" element={<Authentication />} />
            <Route path="/channels/*" element={<Channels />} />
          </Routes>
        </ScreenModalProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
