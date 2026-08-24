import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export default function Login() {
const { login } = useAuth();
const navigate = useNavigate();
const [role, setRole] = useState(ROLES.ADMIN);
const [name, setName] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Log the user into session
    login({ name, role });

    // Role-based redirection
    if (role === ROLES.ADMIN) navigate('/admin/dashboard');
    else if (role === ROLES.PANCHAYAT) navigate('/panchayat/dashboard');
    else navigate('/citizen/dashboard');
};

return (
<div style={styles.container}>
<div style={styles.card}>
        <div style={styles.header}>
<h2 style={{ margin: 0, color: '#0b3c5d' }}>Smart Village Portal</h2>
<p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            Rural Development & Governance System
        </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name / Official ID</label>
            <input
            type="text"
            required
            placeholder="e.g. Officer Ramesh / Citizen Priya"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            />
</div>

<div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
            type="password"
            placeholder="Enter password (any for demo)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            />
</div>

<div style={styles.inputGroup}>
            <label style={styles.label}>Select Role</label>
            <select 
value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
            >
<option value={ROLES.ADMIN}>Admin (Government Officer)</option>
<option value={ROLES.PANCHAYAT}>Panchayat Officer</option>
<option value={ROLES.CITIZEN}>Citizen</option>
            </select>
</div>

<button type="submit" style={styles.button}>
            Access Portal
</button>
        </form>
</div>
    </div>
);
}

const styles = {
container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
},
card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '2.5rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
},
header: {
    textAlign: 'center',
    marginBottom: '2rem',
},
form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
},
inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
},
label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#333',
},
input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.95rem',
    outline: 'none',
},
select: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.95rem',
    backgroundColor: '#fff',
    outline: 'none',
},
button: {
    padding: '0.85rem',
    marginTop: '0.5rem',
    backgroundColor: '#0b3c5d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
},
};