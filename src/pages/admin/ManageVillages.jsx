import React, { useState } from 'react';

export default function ManageVillages() {
const [villages, setVillages] = useState([
    { id: 1, name: 'Rampur', officer: 'Suresh Kumar', population: 4500, status: 'Active' },
    { id: 2, name: 'Sundarpur', officer: 'Meena Devi', population: 3200, status: 'Active' },
    { id: 3, name: 'Haridaspur', officer: 'Rajesh Patel', population: 5800, status: 'Active' },
]);
const [newVillage, setNewVillage] = useState({ name: '', officer: '', population: '' });

const handleAdd = (e) => {
    e.preventDefault();
    if (!newVillage.name || !newVillage.officer) return;
    setVillages([...villages, { ...newVillage, id: Date.now(), status: 'Active' }]);
    setNewVillage({ name: '', officer: '', population: '' });
};

return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
    <h2 style={{ color: '#0b3c5d', marginBottom: '1.5rem' }}>Manage Villages & Officers</h2>

      {/* Add Village Form */}
    <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', background: '#fff', padding: '1rem', borderRadius: '8px' }}>
        <input
        type="text"
        placeholder="Village Name"
        value={newVillage.name}
        onChange={(e) => setNewVillage({ ...newVillage, name: e.target.value })}
        style={{ padding: '0.5rem', flex: '1', minWidth: '180px' }}
        required
        />
        <input
        type="text"
        placeholder="Assigned Panchayat Officer"
        value={newVillage.officer}
        onChange={(e) => setNewVillage({ ...newVillage, officer: e.target.value })}
        style={{ padding: '0.5rem', flex: '1', minWidth: '180px' }}
        required
        />
        <input
        type="number"
        placeholder="Population"
        value={newVillage.population}
        onChange={(e) => setNewVillage({ ...newVillage, population: e.target.value })}
        style={{ padding: '0.5rem', width: '130px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1.5rem', background: '#0b3c5d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        + Add Village
        </button>
    </form>

      {/* Villages List */}
    <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
            <th style={{ padding: '0.5rem' }}>Village Name</th>
            <th style={{ padding: '0.5rem' }}>Panchayat Officer</th>
            <th style={{ padding: '0.5rem' }}>Population</th>
            <th style={{ padding: '0.5rem' }}>Status</th>
            </tr>
        </thead>
        <tbody>
            {villages.map((v) => (
            <tr key={v.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>{v.name}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{v.officer}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{v.population || 'N/A'}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                <span style={{ color: '#2e7d32', fontWeight: '600' }}>● {v.status}</span>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
);
}