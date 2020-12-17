import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { rotateYLeftToRight, zoomIn } from '../admin/subcategories/animations';
import { Card, Avatar, Col, Row } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/product/productSlice';

const { Meta } = Card;

const Products = () => {
  const { all } = useSelector(state => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (all.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);
  return (
    <motion.div
      variants={rotateYLeftToRight}
      initial='hidden'
      animate='show'
      className='container-fluid'>
      <Row
        gutter={[10, { xs: 8, sm: 10, md: 12, lg: 16 }]}
        justify='space-between'>
        {all.map(product => (
          <Col
            className='gutter-row'
            xl={6}
            md={12}
            sm={24}
            style={{ marginBottom: 10 }}
            key={product._id}>
            <Card
              style={{ width: 300, overflow: 'hidden' }}
              cover={
                <ProductCardImage
                  alt={product.title}
                  style={{ height: '280px' }}
                  src={product.images[0]}
                />
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
                description={product.description}
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
