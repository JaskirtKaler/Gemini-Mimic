import './App.css'
import './Login.jsx'
import Login from './Login'
import Home from "./Home"
import Signup from './Signup'
import Logout from './Logout'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        {/* Define other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
