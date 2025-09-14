import React from 'react';
import LeaveForm from './LeaveForm';
import LeaveList from './LeaveList';

export default function Dashboard({ token, role }){
  return (
    <div>
      <h2>Dashboard</h2>
      <p className="muted">Use this dashboard to apply for leaves and see your requests.</p>
      <LeaveForm />
      <LeaveList role={role} />
    </div>
  );
}
