import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Products from './products/Products';
import { MainPageContainer } from '../styles/HomePageStyles';

const Home = () => {
  const firstVisit = useRef(true);
  const { darkMode } = useSelector(state => state.theme);

  useEffect(() => {
    if (firstVisit.current) {
      firstVisit.current = false;
      return;
    } else {
      toast.success('Welcome to the store!');
    }
  }, []);

  return (
    <MainPageContainer darkMode={darkMode}>
      <h2>Products</h2>
      <Products />
    </MainPageContainer>
  );
};

export default Home;
