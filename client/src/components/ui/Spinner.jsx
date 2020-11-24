import React from 'react';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';
import forbidden from '../../assets/forbidden_403.svg';

const override = css`
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  border-color: red;
  transform: rotate(90deg);
`;

const Spinner = ({ message = '', showImage = true, color = '#C96D7B' }) => {
  const loading = true;

  return (
    <div className='sweet-loading'>
      {message.trim() && (
        <>
          {showImage && (
            <img
              src={forbidden}
              style={{
                position: 'absolute',
                top: '17%',
                left: '50%',
                textAlign: 'center',
                width: '150px',
                transform: 'translateX(-50%)',
              }}
              alt='access forbidden'
            />
          )}
          <h4
            style={{
              position: 'absolute',
              top: '45%',
              left: '33%',
              textAlign: 'center',
              width: '300px',
              transform: 'translate(0,-50%)',
            }}>
            {message}
          </h4>
        </>
      )}
      <PulseLoader css={override} size={30} color={color} loading={loading} />
    </div>
  );
};

export default Spinner;
