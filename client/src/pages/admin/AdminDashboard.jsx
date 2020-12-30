import React from 'react';
import AdminNavSidebar from '../../components/navigation/AdminNavSidebar';
import useShowSideMenu from '../../hooks/useShowSideMenu';
import { MenuOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
  const [showSidebar, setShowSidebar, showMenuIcon] = useShowSideMenu();
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNavSidebar
            fullHeight={true}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>
        <div className='col-md-8 offset-md-1 mt-3'>
          <h2>Admin Dashboard</h2>
          {showMenuIcon && (
            <MenuOutlined
              style={{ position: 'absolute', right: 40, top: 20 }}
              onClick={() => setShowSidebar(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
