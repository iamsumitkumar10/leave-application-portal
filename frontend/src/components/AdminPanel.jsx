import React, { useEffect, useState } from 'react';
import API from '../api';

export default function AdminPanel({ token, role }){
  const [leaves, setLeaves] = useState([]);
  const [msg, setMsg] = useState('');

  async function load(){
    try {
      const res = await API.get('/leaves');
      setLeaves(res.data);
    } catch(err){
      console.error(err);
      setMsg(err.response?.data?.message || 'Load failed');
    }
  }
  useEffect(()=> { load(); }, []);

  async function review(id, action){
    try {
      await API.put('/leaves/' + id + '/' + action);
      load();
    } catch(err){
      setMsg(err.response?.data?.message || 'Action failed');
    }
  }

  if(role !== 'admin'){
    return <div className="container"><h3>Admin Panel</h3><p className="muted">You are not an admin.</p></div>
  }

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      {msg && <p className="muted">{msg}</p>}
      <table>
        <thead><tr><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l._id}>
              <td>{l.employeeId?.name || l.employeeId?.email || l.employeeId}</td>
              <td>{l.leaveType}</td>
              <td>{new Date(l.startDate).toLocaleDateString()}</td>
              <td>{new Date(l.endDate).toLocaleDateString()}</td>
              <td className={l.status === 'pending' ? 'status-pending' : l.status === 'approved' ? 'status-approved' : 'status-rejected'}>{l.status}</td>
              <td>
                {l.status === 'pending' && <>
                  <button onClick={()=>review(l._id,'approve')}>Approve</button>
                  <button onClick={()=>review(l._id,'reject')}>Reject</button>
                </>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
