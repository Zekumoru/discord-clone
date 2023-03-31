import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
