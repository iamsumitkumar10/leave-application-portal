import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar({ token, role, onLogout }){
  return (
    <nav>
      <div>
        <Link to="/" style={{fontWeight:700, color:'#fff'}}>Leave Portal</Link>
      </div>
      <div>
        {!token && <>
          <Link to="/login" style={{marginRight:12}}>Login</Link>
          <Link to="/register">Register</Link>
        </>}
        {token && <>
          <span style={{marginRight:12}} className="muted">Role: {role || 'employee'}</span>
          {role === 'admin' && <Link to="/admin" style={{marginRight:12}}>Admin</Link>}
          <button className="btn" onClick={onLogout}>Logout</button>
        </>}
      </div>
    </nav>
  );
}
