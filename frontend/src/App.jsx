import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const navigate = useNavigate();

  useEffect(()=> {
    if(!token) {
      navigate('/login');
    }
  }, [token]);

  function handleLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    navigate('/login');
  }

  return (
    <div>
      <Navbar token={token} role={role} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard token={token} role={role} />} />
          <Route path="/login" element={<Login onLogin={(t,r)=>{ setToken(t); setRole(r); }} />} />
          <Route path="/register" element={<Register onRegister={(t,r)=>{ setToken(t); setRole(r); }} />} />
          <Route path="/admin" element={<AdminPanel token={token} role={role} />} />
        </Routes>
      </main>
    </div>
  );
}
