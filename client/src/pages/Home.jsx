import React, { useEffect, useRef } from 'react';
import Logo from '../assets/Logo';
import { toast } from 'react-toastify';

const Home = () => {
  const firstVisit = useRef(true);
  useEffect(() => {
    if (firstVisit.current) {
      firstVisit.current = false;
      return;
    } else {
      toast.success('Welcome to the store!');
    }
  }, []);
  return (
    <div>
      <h2>Nice to Have Shop</h2>
      <Logo />
    </div>
  );
};

export default Home;
