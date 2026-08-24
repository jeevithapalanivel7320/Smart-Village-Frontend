import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ROLES } from '../utils/constants';

// Pages
import Login from '../pages/auth/Login';
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import SubmitGrievance from '../pages/citizen/SubmitGrievance';
import PanchayatDashboard from '../pages/panchayat/PanchayatDashboard';
import UpdateProjects from '../pages/panchayat/UpdateProjects';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageVillages from '../pages/admin/ManageVillages';

export const AppRoutes = () => {
return (
    <Routes>
<Route path="/login" element={<Login />} />

      {/* Citizen Protected Routes */}
<Route element={<ProtectedRoute allowedRoles={[ROLES.CITIZEN]} />}>
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
        <Route path="/citizen/submit-grievance" element={<SubmitGrievance />} />
</Route>

      {/* Panchayat Protected Routes */}
<Route element={<ProtectedRoute allowedRoles={[ROLES.PANCHAYAT]} />}>
        <Route path="/panchayat/dashboard" element={<PanchayatDashboard />} />
        <Route path="/panchayat/update-projects" element={<UpdateProjects />} />
</Route>

      {/* Admin Protected Routes */}
<Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-villages" element={<ManageVillages />} />
</Route>

      {/* Fallback */}
<Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
);
};