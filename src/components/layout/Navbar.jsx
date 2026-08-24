import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, UserCheck } from 'lucide-react';

export const Navbar = () => {
const { user, logout } = useAuth();

return (
    <header className="navbar">
    <div className="navbar-brand">
    <h2>Smart Village Portal</h2>
</div>
{user && (
        <div className="navbar-user">
<span className={`role-badge role-${user.role.toLowerCase()}`}>
            <UserCheck size={14} /> {user.role}
</span>
<span className="user-name">{user.name}</span>
<button onClick={logout} className="btn-logout" title="Sign Out">
            <LogOut size={16} />
</button>
        </div>
)}
    </header>
);
};