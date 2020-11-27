import React from 'react';
import AdminNavSidebar from '../../components/navigation/AdminNavSidebar';

const AdminDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNavSidebar />
        </div>
        <div className='col-md-8 offset-md-1'>
          <div className='container mt-3'>
            <h2>Admin Dashboard</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
