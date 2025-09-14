import React, { useState } from 'react';
import API from '../api';

export default function LeaveForm(){
  const [leaveType,setLeaveType] = useState('casual');
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [reason,setReason] = useState('');
  const [msg,setMsg] = useState('');

  async function submit(e){
    e.preventDefault();
    setMsg('');
    try {
      const res = await API.post('/leaves', { leaveType, startDate, endDate, reason });
      setMsg('Applied successfully');
      setLeaveType('casual'); setStartDate(''); setEndDate(''); setReason('');
    } catch(err){
      console.error(err);
      setMsg(err.response?.data?.message || 'Apply failed');
    }
  }

  return (
    <div style={{marginTop:12}}>
      <h3>Apply for Leave</h3>
      <form onSubmit={submit}>
        <label>Leave Type</label>
        <select value={leaveType} onChange={e=>setLeaveType(e.target.value)}>
          <option value="casual">Casual</option>
          <option value="sick">Sick</option>
          {/* <option value="earned">Earned</option> */}
          <option value="other">Other</option>
        </select>
        <div className="row">
          <div className="col">
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          </div>
          <div className="col">
            <label>End Date</label>
            <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
          </div>
        </div>
        <label>Reason</label>
        <textarea value={reason} onChange={e=>setReason(e.target.value)} />
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Apply</button>
        </div>
        {msg && <p className="muted">{msg}</p>}
      </form>
    </div>
  );
}
