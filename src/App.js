import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatbotPage from './pages/ChatbotPage';

function App() {
  const token = localStorage.getItem('token');
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {token ? <Route path="/chatbot" element={<ChatbotPage />} /> : <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
