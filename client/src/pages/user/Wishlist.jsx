import React from 'react';
import UserHistorySidebar from '../../components/navigation/UserHistorySidebar';

const Wishlist = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserHistorySidebar />
        </div>
        <div className='col-md-10'>
          <h2>Your Wishlist</h2>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
