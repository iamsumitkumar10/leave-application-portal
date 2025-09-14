import React, { useEffect, useState } from 'react';
import API from '../api';

export default function LeaveList({ role }){
  const [leaves, setLeaves] = useState([]);
  const [msg, setMsg] = useState('');

  async function load(){
    try {
      if(role === 'admin'){
        const res = await API.get('/leaves');
        setLeaves(res.data);
      } else {
        const res = await API.get('/leaves/my');
        setLeaves(res.data);
      }
    } catch(err){
      console.error(err);
      setMsg(err.response?.data?.message || 'Load failed');
    }
  }

  useEffect(()=> { load(); }, [role]);

  async function cancel(id){
    try {
      await API.delete('/leaves/' + id);
      load();
    } catch(err){
      setMsg(err.response?.data?.message || 'Cancel failed');
    }
  }

  return (
    <div>
      <h3 style={{marginTop:16}}>Leave Requests</h3>
      {msg && <p className="muted">{msg}</p>}
      <table>
        <thead><tr><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l._id}>
              <td>{l.employeeId?.name || l.employeeId}</td>
              <td>{l.leaveType}</td>
              <td>{new Date(l.startDate).toLocaleDateString()}</td>
              <td>{new Date(l.endDate).toLocaleDateString()}</td>
              <td className={l.status === 'pending' ? 'status-pending' : l.status === 'approved' ? 'status-approved' : 'status-rejected'}>{l.status}</td>
              <td className="actions">
                {l.status === 'pending' && role !== 'admin' && <button onClick={()=>cancel(l._id)}>Cancel</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
