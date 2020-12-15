import React, { useEffect, useState } from 'react';
import UserHistorySidebar from '../../components/navigation/UserHistorySidebar';
import UpdatePass from '../../assets/password-update.svg';
import { authWithFirebase } from '../../firebase.js';
import { toast } from 'react-toastify';
import Spinner from '../../components/ui/Spinner';
const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await authWithFirebase.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success('Password will be updated in a moment!');
      })
      .catch(err => {
        setError(err.message);
        console.log(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => {
      setError(null);
    };
  }, [error]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 h-100'>
          <UserHistorySidebar />
        </div>
        <div className='col-md-8 mx-1 mt-5 offset-md-2 text-center'>
          <form onSubmit={handlePasswordSubmit}>
            <div className='input-group mb-3 w-100 ml-5'>
              <div className='input-group-prepend'>
                <span
                  className='input-group-text rounded px-3'
                  style={{
                    backgroundColor: '#5F00BA',
                    color: '#E5B769',
                    fontWeight: 'bold',
                  }}
                  id='basic-addon1'>
                  New Password {'>'}
                </span>
              </div>
              <input
                type='password'
                className='form-control pl-3 ml-2'
                placeholder='Enter your new password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                aria-label='Enter your new password label'
                disabled={loading}
                aria-describedby='basic-addon1'
              />
              <button
                type='submit'
                className='btn btn-success'
                disabled={!password || password.length < 6 || loading}>
                Submit
              </button>
            </div>
          </form>
          {loading ? (
            <div style={{ marginTop: '80%' }}>
              <Spinner
                color='green'
                message='Sending data...'
                showImage={false}
              />
            </div>
          ) : (
            <img
              src={UpdatePass}
              className='text-center'
              style={{ maxWidth: 400 }}
              alt='update password block'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;
