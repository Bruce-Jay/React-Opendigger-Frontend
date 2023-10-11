import Main from './pages/Main';
import LoginAndRegister from './pages/LoginAndRegister';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginAndRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
