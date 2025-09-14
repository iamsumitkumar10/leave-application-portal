import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login({ onLogin }){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('employee');
  const [err,setErr] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/auth/login', { email, password });
      const token = res.data.token;
      // we can't get role from backend, so rely on local selection or existing localStorage
      localStorage.setItem('token', token);
      // if role for this email is saved, use it, otherwise use selected role
      const savedRole = localStorage.getItem('role-' + email);
      const finalRole = savedRole || role;
      localStorage.setItem('role', finalRole);
      onLogin(token, finalRole);
      // Redirect based on role
    if (finalRole === 'admin') {
      nav('/admin');   // <-- go to admin panel route
    } else {
      nav('/');        // <-- go to employee/home page
    }
    } catch(err){
      console.error(err);
      setErr(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <label>Role (Select Your Role)</label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Login</button>
        </div>
        {err && <p className="muted">{err}</p>}
      </form>
    </div>
  );
}
