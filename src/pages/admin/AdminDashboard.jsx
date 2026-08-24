import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
const { user } = useAuth();

  // Mock State for Projects needing Approval
const [projects, setProjects] = useState([
    { id: 1, name: 'Solar Street Lights Installation', village: 'Rampur', budget: '₹4,50,000', status: 'Pending Approval' },
    { id: 2, name: 'Primary School Drinking Water Tank', village: 'Sundarpur', budget: '₹2,20,000', status: 'Pending Approval' },
    { id: 3, name: 'Main Road Concrete Paving', village: 'Haridaspur', budget: '₹12,00,000', status: 'Approved' },
]);

const handleApprove = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
};

const handleReject = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
};

return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
        <h1 style={{ margin: 0, color: '#0b3c5d' }}>District Admin Overview</h1>
        <p style={{ color: '#666', marginTop: '0.25rem' }}>Welcome, {user?.name || 'Administrator'}</p>
        </div>
    </div>

      {/* Summary KPI Cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={cardStyle}>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>Total Villages</span>
        <h2 style={{ margin: '0.5rem 0 0', color: '#0b3c5d' }}>24</h2>
        </div>
        <div style={cardStyle}>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>Active Projects</span>
        <h2 style={{ margin: '0.5rem 0 0', color: '#2e7d32' }}>18</h2>
        </div>
        <div style={cardStyle}>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>Pending Proposals</span>
        <h2 style={{ margin: '0.5rem 0 0', color: '#ed6c02' }}>
            {projects.filter(p => p.status === 'Pending Approval').length}
        </h2>
        </div>
        <div style={cardStyle}>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>Total Allocated Budget</span>
        <h2 style={{ margin: '0.5rem 0 0', color: '#1d2731' }}>₹1.48 Cr</h2>
        </div>
    </div>

      {/* Project Approval Table */}
    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.25rem', color: '#1d2731' }}>Development Proposals & Approvals</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: '#555', fontSize: '0.9rem' }}>
            <th style={{ padding: '0.75rem' }}>Project Name</th>
            <th style={{ padding: '0.75rem' }}>Village</th>
            <th style={{ padding: '0.75rem' }}>Estimated Budget</th>
            <th style={{ padding: '0.75rem' }}>Status</th>
            <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {projects.map((proj) => (
            <tr key={proj.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.75rem', fontWeight: '500' }}>{proj.name}</td>
                <td style={{ padding: '0.75rem' }}>{proj.village}</td>
                <td style={{ padding: '0.75rem' }}>{proj.budget}</td>
                <td style={{ padding: '0.75rem' }}>
                <span style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backgroundColor: proj.status === 'Approved' ? '#e8f5e9' : proj.status === 'Rejected' ? '#ffebee' : '#fff3e0',
                    color: proj.status === 'Approved' ? '#2e7d32' : proj.status === 'Rejected' ? '#c62828' : '#e65100',
                }}>
                    {proj.status}
                </span>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                {proj.status === 'Pending Approval' ? (
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button onClick={() => handleApprove(proj.id)} style={{ ...btnAction, background: '#2e7d32', color: '#fff' }}>
                        Approve
                    </button>
                    <button onClick={() => handleReject(proj.id)} style={{ ...btnAction, background: '#c62828', color: '#fff' }}>
                        Reject
                    </button>
                    </div>
                ) : (
                    <span style={{ color: '#999', fontSize: '0.85rem' }}>Completed</span>
                )}
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
);
}

const cardStyle = {
backgroundColor: '#fff',
padding: '1.25rem',
borderRadius: '8px',
boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const btnAction = {
border: 'none',
padding: '0.4rem 0.8rem',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '0.8rem',
fontWeight: '600',
};