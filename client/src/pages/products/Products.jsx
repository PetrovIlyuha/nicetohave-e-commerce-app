import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { rotateYLeftToRight } from '../admin/subcategories/animations';
import { Card, Avatar, Col, Row, Carousel } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsByCount } from '../../redux/product/productSlice';

const { Meta } = Card;

const Products = () => {
  const { all } = useSelector(state => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (all.length === 0) {
      dispatch(getAllProductsByCount(2));
    }
  }, [dispatch]);

  return (
    <motion.div
      variants={rotateYLeftToRight}
      initial='hidden'
      animate='show'
      className='ml-5'>
      <Row gutter={[48, 48]} justify='center'>
        {all.map(product => (
          <Col
            className='gutter-row'
            xl={6}
            md={12}
            sm={24}
            gutter={{ xs: 32, sm: 14, md: 24, lg: 0 }}
            style={{ marginBottom: 10 }}
            key={product._id}>
            <Card
              cover={
                <Carousel
                  autoplay
                  autoplaySpeed={8000}
                  dots={{ padding: '2rem', color: 'red' }}>
                  {product.images.map((img, idx) => (
                    <img key={idx} src={img.url} />
                  ))}
                </Carousel>
              }
              actions={[
                <SettingOutlined key='setting' />,
                <EditOutlined key='edit' />,
                <EllipsisOutlined key='ellipsis' />,
              ]}>
              <Meta
                style={{ overflow: 'hidden' }}
                avatar={<Avatar src={product.category.image} />}
                title={product.title}
                description={product.description.slice(0, 70).concat('...')}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
};

const ProductCardImage = styled.img`
  transition: all 0.6s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

export default Products;
