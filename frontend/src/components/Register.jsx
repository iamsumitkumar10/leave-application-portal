
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Register({ onRegister }){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('employee');
  const [err,setErr] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/auth/register', { name, email, password, role });
      const token = res.data.token;
      localStorage.setItem('token', token);
      // remember role with email key, so future login knows it
      localStorage.setItem('role-' + email, role);
      localStorage.setItem('role', role);
      onRegister(token, role);
      // nav('/');
      // Redirect based on role
    if (role === 'admin') {
      nav('/admin');  // go to admin panel
    } else {
      nav('/');       // go to employee/home
    }
    } catch(err){
      console.error(err);
      setErr(err.response?.data?.message || 'Register failed');
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} />
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <label>Role</label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Register</button>
        </div>
        {err && <p className="muted">{err}</p>}
      </form>
    </div>
  );
}
