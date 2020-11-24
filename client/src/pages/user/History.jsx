import React from 'react';
import UserHistorySidebar from '../../components/navigation/UserHistorySidebar';

const History = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserHistorySidebar />
        </div>
        <div className='col-md-10'>
          <h2>User History</h2>
        </div>
      </div>
    </div>
  );
};

export default History;
