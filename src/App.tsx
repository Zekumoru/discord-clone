import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
import Channels from './pages/channels/Channels';
import ScreenModalProvider from './contexts/screen-modal/ScreenModal';

function App() {
  return (
    <div className="App">
      <ScreenModalProvider>
        <Routes>
          <Route path="/*" element={<Authentication />} />
          <Route path="/channels/*" element={<Channels />} />
        </Routes>
      </ScreenModalProvider>
    </div>
  );
}

export default App;
