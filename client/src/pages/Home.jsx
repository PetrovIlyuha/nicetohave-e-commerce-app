import React, { useEffect, useRef } from 'react';
import Logo from '../assets/Logo';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/product/productSlice';
import Products from './products/Products';
import { MainPageContainer } from '../styles/HomePageStyles';

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
    <MainPageContainer>
      <h2>Products</h2>
      {/* <Logo /> */}
      <Products />
    </MainPageContainer>
  );
};

export default Home;
