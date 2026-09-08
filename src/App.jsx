import React, { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Role Definitions
export const ROLES = {
  TALUK_OFFICER: 'TALUK_OFFICER',
  PANCHAYAT_OFFICER: 'PANCHAYAT_OFFICER',
  CITIZEN: 'CITIZEN',
};

// Registered Government Official Database for Verification
const OFFICIAL_USERS = [
  { identifier: 'TLK101', password: 'admin123', role: ROLES.TALUK_OFFICER, name: 'Taluk Executive Officer' },
  { identifier: 'TLK102', password: 'admin123', role: ROLES.TALUK_OFFICER, name: 'Sub-Collector / Taluk Head' },
  { identifier: 'PNC201', password: 'panchayat123', role: ROLES.PANCHAYAT_OFFICER, name: 'Sivakasi Panchayat Officer' },
  { identifier: 'PNC202', password: 'panchayat123', role: ROLES.PANCHAYAT_OFFICER, name: 'Sattur Panchayat Officer' },
  { identifier: 'citizen@gmail.com', password: 'citizen123', role: ROLES.CITIZEN, name: 'Registered Citizen' },
];

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Authentic Vector Component of Tamil Nadu Government Seal
const OfficialTamilNaduEmblem = ({ size = 60 }) => (
  <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="94" fill="#FFFFFF" stroke="#006622" strokeWidth="6" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#006622" strokeWidth="2" />
      <text x="100" y="32" fill="#006622" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        தமிழ்நாடு அரசு
      </text>
      <path d="M72 140 L76 75 L84 55 L92 42 L108 42 L116 55 L124 75 L128 140 Z" fill="#FFA500" stroke="#CC7A00" strokeWidth="2" />
      <rect x="90" y="36" width="20" height="7" fill="#FFA500" stroke="#CC7A00" strokeWidth="1.5" />
      <circle cx="94" cy="32" r="2.5" fill="#CC7A00" />
      <circle cx="100" cy="30" r="3" fill="#CC7A00" />
      <circle cx="106" cy="32" r="2.5" fill="#CC7A00" />
      <line x1="75" y1="120" x2="125" y2="120" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="78" y1="100" x2="122" y2="100" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="82" y1="80" x2="118" y2="80" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="86" y1="62" x2="114" y2="62" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="65" y="140" width="70" height="7" fill="#FF9933" />
      <rect x="65" y="147" width="70" height="7" fill="#FFFFFF" stroke="#DDD" strokeWidth="0.5" />
      <rect x="65" y="154" width="70" height="7" fill="#128807" />
      <path d="M92 142 C92 130 96 122 100 122 C104 122 108 130 108 142 Z" fill="#D32F2F" />
      <circle cx="100" cy="150" r="2.5" fill="#000080" />
      <text x="100" y="180" fill="#006622" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        வாய்மையே வெல்லும்
      </text>
    </svg>
  </div>
);

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smart_village_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'High Mast Solar Street Lights Installation',
      village: 'Sivakasi',
      budget: '₹5,50,000',
      progress: 80,
      status: 'Approved',
      photo: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&auto=format&fit=crop&q=60',
      lastUpdated: '2026-08-10',
    },
    {
      id: 2,
      name: 'Government Higher Secondary School Drinking Water Tank',
      village: 'Thiruthangal',
      budget: '₹3,20,000',
      progress: 35,
      status: 'Pending Approval',
      photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=500&auto=format&fit=crop&q=60',
      lastUpdated: '2026-08-18',
    },
    {
      id: 3,
      name: 'Main Bazaar Drainage Concrete Reconstruction',
      village: 'Sattur',
      budget: '₹11,40,000',
      progress: 100,
      status: 'Approved',
      photo: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60',
      lastUpdated: '2026-08-22',
    },
    {
      id: 4,
      name: 'Road & Bridge construction  ',
      village: 'Sattur',
      budget: '₹25,70,000',
      progress: 20,
      status: 'Pending Approval',
      photo: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60',
      lastUpdated: '2026-08-22',
    },
  ]);

  const [complaints, setComplaints] = useState([
    {
      id: 101,
      citizenEmail: 'priya.citizen@tn.gov.in',
      village: 'Sivakasi',
      category: 'Drinking Water',
      issue: 'Water pipeline leak near Bus Stand East Road',
      status: 'In Progress',
      officerRemarks: 'Panchayat maintenance worker assigned.',
      date: '2026-08-20',
    },
    {
      id: 102,
      citizenEmail: 'karthik.c@tn.gov.in',
      village: 'Thiruthangal',
      category: 'Street Light',
      issue: 'Lamps not functioning near temple entrance road',
      status: 'Pending Review',
      officerRemarks: 'Awaiting local electrical technician visit.',
      date: '2026-08-23',
    },
  ]);

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, village: 'Sattur', rating: 5, comment: 'Drainage reconstruction was completed quickly without traffic delays.', author: 'Resident Murugan' },
  ]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('smart_village_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smart_village_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, projects, setProjects, complaints, setComplaints, feedbacks, setFeedbacks }}>
      <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
        <GovernmentHeader />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/citizen/home" element={<CitizenHome />} />
          <Route path="/taluk/home" element={<TalukOfficerHome />} />
          <Route path="/panchayat/home" element={<PanchayatOfficerHome />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

// Government Header with Moving Marquee
function GovernmentHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header style={{ backgroundColor: '#0B3C5D', color: '#FFFFFF', borderBottom: '3px solid #D9B310', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0.85rem 1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', cursor: 'pointer' }} onClick={() => user && navigate(getRedirectPath(user.role))}>
            <OfficialTamilNaduEmblem size={60} />
            <div>
              <h1 style={{ margin: 0, fontSize: '1.45rem', fontWeight: '800', letterSpacing: '0.8px' }}>
                SMART VILLAGE DEVELOPMENT PORTAL
              </h1>
              <div style={{ fontSize: '0.82rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#D9B310', fontWeight: '700', marginTop: '2px' }}>
                RURAL DEVELOPMENT & PANCHAYAT RAJ DEPARTMENT
              </div>
            </div>
          </div>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: '600' }}>{user.identifier}</div>
                <span style={{ display: 'inline-block', backgroundColor: '#1D2731', color: '#D9B310', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '10px', marginTop: '3px', fontWeight: 'bold' }}>
                  {user.role.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                style={{ backgroundColor: '#C62828', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div style={{ backgroundColor: '#1D2731', color: '#D9B310', padding: '0.4rem 0', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1.5px', borderBottom: '2px solid #D9B310' }}>
        <marquee behavior="scroll" direction="left" scrollamount="6">
          ★ GOVERNMENT OF TAMIL NADU ★ RURAL DEVELOPMENT & PANCHAYAT RAJ ★ SIVAKASI • THIRUTHANGAL • SATTUR JURISDICTION ★
        </marquee>
      </div>
    </>
  );
}

const getRedirectPath = (role) => {
  if (role === ROLES.TALUK_OFFICER) return '/taluk/home';
  if (role === ROLES.PANCHAYAT_OFFICER) return '/panchayat/home';
  return '/citizen/home';
};

// Login Page with 3 Distinct Role Selection Buttons & Error Validation
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState(ROLES.TALUK_OFFICER);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isOfficer = selectedRole === ROLES.TALUK_OFFICER || selectedRole === ROLES.PANCHAYAT_OFFICER;

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setIdentifier('');
    setPassword('');
    setErrorMessage('');
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedId = identifier.trim();
    const trimmedPass = password.trim();

    // Check credentials against registered database
    const matchedOfficer = OFFICIAL_USERS.find(
      (u) => u.identifier.toUpperCase() === trimmedId.toUpperCase() && u.role === selectedRole
    );

    if (isOfficer) {
      if (!matchedOfficer) {
        setErrorMessage(`Invalid Employee ID: "${trimmedId}" is not registered for ${selectedRole.replace('_', ' ')}.`);
        return;
      }
      if (matchedOfficer.password !== trimmedPass) {
        setErrorMessage('Wrong Password! Please enter the correct password.');
        return;
      }
    } else {
      // Citizen Authentication
      if (matchedOfficer && matchedOfficer.password !== trimmedPass) {
        setErrorMessage('Wrong Password! Please check your credentials.');
        return;
      }
    }

    // Success Authentication
    login({
      identifier: trimmedId,
      role: selectedRole,
      name: matchedOfficer ? matchedOfficer.name : 'Citizen User',
    });
    navigate(getRedirectPath(selectedRole));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)', padding: '2rem 1.5rem' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', borderTop: '6px solid #0B3C5D', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', width: '100%', maxWidth: '530px', padding: '2.5rem 2.2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
            <OfficialTamilNaduEmblem size={75} />
          </div>
          <h2 style={{ color: '#0B3C5D', margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>
            Village Development Monitoring Portal
          </h2>
          <div style={{ color: '#0B3C5D', fontWeight: '800', fontSize: '0.82rem', letterSpacing: '1.5px', marginTop: '5px', textTransform: 'uppercase' }}>
            GOVERNMENT OF TAMIL NADU
          </div>
        </div>

        {/* 3 Role Selection Buttons */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ ...formLabel, textAlign: 'center', marginBottom: '0.6rem' }}>Select User Portal</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleRoleChange(ROLES.TALUK_OFFICER)}
              style={{
                ...roleSelectBtn,
                backgroundColor: selectedRole === ROLES.TALUK_OFFICER ? '#0B3C5D' : '#F1F5F9',
                color: selectedRole === ROLES.TALUK_OFFICER ? '#FFFFFF' : '#0B3C5D',
                border: selectedRole === ROLES.TALUK_OFFICER ? '2px solid #0B3C5D' : '1px solid #CBD5E1',
              }}
            >
              Taluk Officer
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange(ROLES.PANCHAYAT_OFFICER)}
              style={{
                ...roleSelectBtn,
                backgroundColor: selectedRole === ROLES.PANCHAYAT_OFFICER ? '#0B3C5D' : '#F1F5F9',
                color: selectedRole === ROLES.PANCHAYAT_OFFICER ? '#FFFFFF' : '#0B3C5D',
                border: selectedRole === ROLES.PANCHAYAT_OFFICER ? '2px solid #0B3C5D' : '1px solid #CBD5E1',
              }}
            >
              Panchayat Officer
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange(ROLES.CITIZEN)}
              style={{
                ...roleSelectBtn,
                backgroundColor: selectedRole === ROLES.CITIZEN ? '#0B3C5D' : '#F1F5F9',
                color: selectedRole === ROLES.CITIZEN ? '#FFFFFF' : '#0B3C5D',
                border: selectedRole === ROLES.CITIZEN ? '2px solid #0B3C5D' : '1px solid #CBD5E1',
              }}
            >
              Citizen
            </button>
          </div>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.2rem', border: '1px solid #EF9A9A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚠</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={formLabel}>
              {isOfficer ? 'Employee ID (Emp ID)' : 'Email Address'}
            </label>
            <input
              type={isOfficer ? 'text' : 'email'}
              required
              placeholder={
                selectedRole === ROLES.TALUK_OFFICER
                  ? 'Enter Taluk Emp ID (e.g., TLK101)'
                  : selectedRole === ROLES.PANCHAYAT_OFFICER
                  ? 'Enter Panchayat Emp ID (e.g., PNC201)'
                  : 'Enter your email (e.g., citizen@gmail.com)'
              }
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={formInput}
            />
          </div>

          <div>
            <label style={formLabel}>Password</label>
            <input
              type="password"
              required
              placeholder="Enter secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={formInput}
            />
          </div>

          <button
            type="submit"
            style={{ padding: '0.85rem', backgroundColor: '#0B3C5D', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.3rem' }}
          >
            Authenticate & Proceed as {selectedRole.replace('_', ' ')}
          </button>
        </form>

        {/* Helpful Credential Note for Presentation / Viva */}
        <div style={{ marginTop: '1.5rem', background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#64748B', border: '1px dashed #CBD5E1' }}>
          <b>Demo Official Access:</b>
          <br />• Taluk Officer: <code>TLK101</code> / <code>admin123</code>
          <br />• Panchayat Officer: <code>PNC201</code> / <code>panchayat123</code>
          <br />• Citizen: <code>citizen@gmail.com</code> / <code>citizen123</code>
        </div>
      </div>
    </div>
  );
}

// 1. Citizen Home Page
function CitizenHome() {
  const { user, projects, complaints, setComplaints, feedbacks, setFeedbacks } = useAuth();
  const [tab, setTab] = useState('projects');
  const [villageFilter, setVillageFilter] = useState('All');

  const [newComplaint, setNewComplaint] = useState({ village: 'Sivakasi', category: 'Road Damage', issue: '' });
  const [newFeedback, setNewFeedback] = useState({ village: 'Sivakasi', rating: 5, comment: '' });

  const handleComplaint = (e) => {
    e.preventDefault();
    if (!newComplaint.issue.trim()) return;
    const report = {
      id: Date.now(),
      citizenEmail: user.identifier,
      village: newComplaint.village,
      category: newComplaint.category,
      issue: newComplaint.issue,
      status: 'Pending Review',
      officerRemarks: 'Submitted to Panchayat cell.',
      date: new Date().toISOString().split('T')[0],
    };
    setComplaints([report, ...complaints]);
    setNewComplaint({ village: 'Sivakasi', category: 'Road Damage', issue: '' });
    alert('Your grievance has been submitted successfully.');
    setTab('complaints');
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.comment.trim()) return;
    setFeedbacks([{ id: Date.now(), ...newFeedback, author: user.identifier }, ...feedbacks]);
    setNewFeedback({ village: 'Sivakasi', rating: 5, comment: '' });
    alert('Thank you for your feedback on village works.');
  };

  const filtered = villageFilter === 'All' ? projects : projects.filter(p => p.village === villageFilter);

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ color: '#0B3C5D', margin: 0 }}>Citizen Development Portal</h2>
          <p style={{ color: '#555', margin: '3px 0 0 0', fontSize: '0.9rem' }}>Review village infrastructure progress, share community feedback, and lodge grievances</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setTab('projects')} style={{ ...tabBtn, background: tab === 'projects' ? '#0B3C5D' : '#E0E7ED', color: tab === 'projects' ? '#fff' : '#0B3C5D' }}>Active Projects</button>
          <button onClick={() => setTab('report')} style={{ ...tabBtn, background: tab === 'report' ? '#0B3C5D' : '#E0E7ED', color: tab === 'report' ? '#fff' : '#0B3C5D' }}>+ Report Grievance</button>
          <button onClick={() => setTab('complaints')} style={{ ...tabBtn, background: tab === 'complaints' ? '#0B3C5D' : '#E0E7ED', color: tab === 'complaints' ? '#fff' : '#0B3C5D' }}>Track Complaints</button>
          <button onClick={() => setTab('feedback')} style={{ ...tabBtn, background: tab === 'feedback' ? '#0B3C5D' : '#E0E7ED', color: tab === 'feedback' ? '#fff' : '#0B3C5D' }}>Village Feedback</button>
        </div>
      </div>

      {tab === 'projects' && (
        <>
          <div style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Filter Village:</span>
            <select value={villageFilter} onChange={(e) => setVillageFilter(e.target.value)} style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}>
              <option value="All">All Villages</option>
              <option value="Sivakasi">Sivakasi</option>
              <option value="Thiruthangal">Thiruthangal</option>
              <option value="Sattur">Sattur</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(p => (
              <div key={p.id} style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #d1dbe5', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <img src={p.photo} alt={p.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div style={{ padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    <span style={{ backgroundColor: '#E3F2FD', color: '#0B3C5D', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{p.village}</span>
                    <span style={{ fontWeight: 'bold', color: p.status === 'Approved' ? '#2E7D32' : '#E65100' }}>{p.status}</span>
                  </div>
                  <h4 style={{ margin: '0 0 0.6rem 0', color: '#1D2731', fontSize: '1.05rem' }}>{p.name}</h4>
                  <div style={{ marginBottom: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span>Completion</span>
                      <span style={{ fontWeight: 'bold' }}>{p.progress}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.progress === 100 ? '#2E7D32' : '#0B3C5D' }}></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#555' }}>Sanctioned Budget: <b>{p.budget}</b></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'report' && (
        <div style={{ maxWidth: '580px', margin: '0 auto', background: '#fff', padding: '2.2rem', borderRadius: '8px', border: '1px solid #d1dbe5', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 1.2rem 0', color: '#0B3C5D' }}>Lodge a Village Grievance</h3>
          <form onSubmit={handleComplaint} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={formLabel}>Select Village</label>
              <select value={newComplaint.village} onChange={(e) => setNewComplaint({ ...newComplaint, village: e.target.value })} style={formInput}>
                <option value="Sivakasi">Sivakasi</option>
                <option value="Thiruthangal">Thiruthangal</option>
                <option value="Sattur">Sattur</option>
              </select>
            </div>
            <div>
              <label style={formLabel}>Grievance Category</label>
              <select value={newComplaint.category} onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })} style={formInput}>
                <option value="Road Damage">Roads & Transportation</option>
                <option value="Drinking Water">Drinking Water Supply & Pipe Leaks</option>
                <option value="Street Light">Street Lights & Electricity Faults</option>
                <option value="Sanitation">Drainage, Garbage & Sanitation</option>
              </select>
            </div>
            <div>
              <label style={formLabel}>Grievance Details</label>
              <textarea
                rows="4"
                required
                placeholder="Provide specific location, street name, and issue details..."
                value={newComplaint.issue}
                onChange={(e) => setNewComplaint({ ...newComplaint, issue: e.target.value })}
                style={{ ...formInput, resize: 'vertical' }}
              />
            </div>
            <button type="submit" style={{ padding: '0.85rem', background: '#0B3C5D', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Submit Grievance
            </button>
          </form>
        </div>
      )}

      {tab === 'complaints' && (
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #d1dbe5', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0B3C5D' }}>Grievance Tracking Log</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E0E7ED', fontSize: '0.85rem', color: '#555' }}>
                <th style={{ padding: '0.75rem' }}>Complaint ID</th>
                <th style={{ padding: '0.75rem' }}>Village</th>
                <th style={{ padding: '0.75rem' }}>Category</th>
                <th style={{ padding: '0.75rem' }}>Description</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Officer Remarks</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '0.85rem' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>#{c.id}</td>
                  <td style={{ padding: '0.75rem' }}>{c.village}</td>
                  <td style={{ padding: '0.75rem' }}>{c.category}</td>
                  <td style={{ padding: '0.75rem' }}>{c.issue}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.75rem', backgroundColor: c.status === 'Resolved' ? '#E8F5E9' : '#FFF3E0', color: c.status === 'Resolved' ? '#2E7D32' : '#E65100' }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#666' }}>{c.officerRemarks || 'In review'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'feedback' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#fff', padding: '1.8rem', borderRadius: '8px', border: '1px solid #d1dbe5' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#0B3C5D' }}>Submit Village Feedback</h3>
            <form onSubmit={handleFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={formLabel}>Village</label>
                <select value={newFeedback.village} onChange={(e) => setNewFeedback({ ...newFeedback, village: e.target.value })} style={formInput}>
                  <option value="Sivakasi">Sivakasi</option>
                  <option value="Thiruthangal">Thiruthangal</option>
                  <option value="Sattur">Sattur</option>
                </select>
              </div>
              <div>
                <label style={formLabel}>Satisfaction Rating (1 to 5 Stars)</label>
                <select value={newFeedback.rating} onChange={(e) => setNewFeedback({ ...newFeedback, rating: Number(e.target.value) })} style={formInput}>
                  <option value={5}>★★★★★ (5/5) Excellent</option>
                  <option value={4}>★★★★☆ (4/5) Good</option>
                  <option value={3}>★★★☆☆ (3/5) Average</option>
                  <option value={2}>★★☆☆☆ (2/5) Needs Improvement</option>
                  <option value={1}>★☆☆☆☆ (1/5) Poor</option>
                </select>
              </div>
              <div>
                <label style={formLabel}>Your Comments / Suggestions</label>
                <textarea rows="3" required placeholder="Write your remarks on development works..." value={newFeedback.comment} onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })} style={{ ...formInput, resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ padding: '0.75rem', background: '#0B3C5D', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Submit Feedback</button>
            </form>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1.8rem', borderRadius: '8px', border: '1px solid #d1dbe5' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#0B3C5D' }}>Recent Citizen Reviews</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {feedbacks.map(f => (
                <div key={f.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#0B3C5D' }}>{f.village}</span>
                    <span style={{ color: '#D9B310' }}>{'★'.repeat(f.rating)}</span>
                  </div>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#333' }}>"{f.comment}"</p>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>By: {f.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Taluk Officer Home Page
function TalukOfficerHome() {
  const { projects, setProjects, complaints } = useAuth();

  const setStatus = (id, newStatus) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#0B3C5D', margin: 0 }}>Taluk Officer Command Dashboard</h2>
        <p style={{ color: '#555', margin: '3px 0 0 0', fontSize: '0.9rem' }}>Project approvals, sanctions, and development oversight for Sivakasi, Thiruthangal & Sattur</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={metricCard}><span style={metricLabel}>Jurisdiction Villages</span><h3 style={metricVal}>3 Units</h3></div>
        <div style={metricCard}><span style={metricLabel}>Pending Project Proposals</span><h3 style={{ ...metricVal, color: '#E65100' }}>{projects.filter(p => p.status === 'Pending Approval').length}</h3></div>
        <div style={metricCard}><span style={metricLabel}>Active Infrastructure Works</span><h3 style={{ ...metricVal, color: '#2E7D32' }}>{projects.filter(p => p.status === 'Approved').length}</h3></div>
        <div style={metricCard}><span style={metricLabel}>Unresolved Grievances</span><h3 style={{ ...metricVal, color: '#C62828' }}>{complaints.filter(c => c.status !== 'Resolved').length}</h3></div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #d1dbe5', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#0B3C5D' }}>Project Proposals & Approvals (Taluk Level)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E0E7ED', fontSize: '0.85rem', color: '#555' }}>
              <th style={{ padding: '0.75rem' }}>Project Name</th>
              <th style={{ padding: '0.75rem' }}>Village</th>
              <th style={{ padding: '0.75rem' }}>Sanction Estimate</th>
              <th style={{ padding: '0.75rem' }}>Current Milestone</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '0.85rem' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{p.name}</td>
                <td style={{ padding: '0.75rem' }}>{p.village}</td>
                <td style={{ padding: '0.75rem' }}>{p.budget}</td>
                <td style={{ padding: '0.75rem' }}>{p.progress}%</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.75rem', backgroundColor: p.status === 'Approved' ? '#E8F5E9' : p.status === 'Rejected' ? '#FFEBEE' : '#FFF3E0', color: p.status === 'Approved' ? '#2E7D32' : p.status === 'Rejected' ? '#C62828' : '#E65100' }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  {p.status === 'Pending Approval' ? (
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button onClick={() => setStatus(p.id, 'Approved')} style={{ ...smallBtn, backgroundColor: '#2E7D32' }}>Approve</button>
                      <button onClick={() => setStatus(p.id, 'Rejected')} style={{ ...smallBtn, backgroundColor: '#C62828' }}>Reject</button>
                    </div>
                  ) : (
                    <span style={{ color: '#888', fontSize: '0.8rem' }}>Decision Recorded</span>
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

// 3. Panchayat Officer Home Page
function PanchayatOfficerHome() {
  const { projects, setProjects, complaints, setComplaints } = useAuth();
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 1);
  const [progressVal, setProgressVal] = useState(50);
  const [photoUrl, setPhotoUrl] = useState('');

  const updateProjectProgress = (e) => {
    e.preventDefault();
    setProjects(projects.map(p => {
      if (p.id === Number(selectedProjectId)) {
        return {
          ...p,
          progress: Number(progressVal),
          photo: photoUrl.trim() || p.photo,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    }));
    alert('Project progress and site photo updated on the public portal.');
  };

  const resolveComplaint = (id, remarks) => {
    const promptRemarks = prompt('Enter officer resolution remarks:', remarks || 'Inspected and repaired.');
    if (promptRemarks === null) return;

    setComplaints(complaints.map(c => {
      if (c.id === id) {
        return { ...c, status: 'Resolved', officerRemarks: promptRemarks };
      }
      return c;
    }));
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#0B3C5D', margin: 0 }}>Panchayat Officer Work Console</h2>
        <p style={{ color: '#555', margin: '3px 0 0 0', fontSize: '0.9rem' }}>Review citizen grievances and update live progress milestones for Sivakasi, Thiruthangal & Sattur</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Complaints Inbox */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #d1dbe5', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0B3C5D' }}>1. Citizen Complaints Inbox</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {complaints.map(c => (
              <div key={c.id} style={{ border: '1px solid #E0E7ED', borderRadius: '6px', padding: '0.9rem', backgroundColor: c.status === 'Resolved' ? '#F9FBF9' : '#FFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#0B3C5D' }}>#{c.id} - {c.village} ({c.category})</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: c.status === 'Resolved' ? '#2E7D32' : '#E65100' }}>{c.status}</span>
                </div>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#333' }}><b>Issue:</b> {c.issue}</p>
                <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                  Reported by: <i>{c.citizenEmail}</i> on {c.date}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#444' }}><b>Remarks:</b> {c.officerRemarks}</span>
                  {c.status !== 'Resolved' && (
                    <button onClick={() => resolveComplaint(c.id, c.officerRemarks)} style={{ ...smallBtn, backgroundColor: '#0B3C5D' }}>
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>npm 
        </div>

        {/* Update Projects */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #d1dbe5', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0B3C5D' }}>2. Update Project Progress & Photos</h3>
          <form onSubmit={updateProjectProgress} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={formLabel}>Select Development Project</label>
              <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)} style={formInput}>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.village} - {p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={formLabel}>Current Milestone Progress ({progressVal}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progressVal}
                onChange={(e) => setProgressVal(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={formLabel}>Site Progress Photo URL</label>
              <input
                type="url"
                placeholder="https://example.com/site-photo.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                style={formInput}
              />
            </div>

            <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#2E7D32', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Publish Progress Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Styling Constants
const containerStyle = {
  maxWidth: '1240px',
  margin: '1.8rem auto',
  padding: '0 1.8rem',
};

const formLabel = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: '#1D2731',
  marginBottom: '0.35rem',
};

const formInput = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '4px',
  border: '1px solid #CBD5E1',
  boxSizing: 'border-box',
  fontSize: '0.9rem',
  backgroundColor: '#FFFFFF',
};

const roleSelectBtn = {
  padding: '0.65rem 0.4rem',
  borderRadius: '6px',
  fontSize: '0.8rem',
  fontWeight: '700',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'all 0.2s ease',
};

const tabBtn = {
  border: 'none',
  padding: '0.55rem 1.1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '0.85rem',
};

const metricCard = {
  backgroundColor: '#FFFFFF',
  padding: '1.1rem',
  borderRadius: '8px',
  border: '1px solid #D1DBE5',
  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
};

const metricLabel = {
  fontSize: '0.8rem',
  color: '#64748B',
  fontWeight: '600',
};

const metricVal = {
  margin: '0.35rem 0 0 0',
  fontSize: '1.35rem',
  color: '#0B3C5D',
};

const smallBtn = {
  color: '#fff',
  border: 'none',
  padding: '0.38rem 0.8rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '600',
  cursor: 'pointer',
};