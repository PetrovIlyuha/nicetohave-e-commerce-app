import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Col,
  Row,
  Divider,
  Button,
  Carousel,
  Avatar,
  Spin,
  Space,
} from 'antd';

import { motion } from 'framer-motion';
import { zoomIn } from '../subcategories/animations';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Meta } = Card;

const ProductCatalogue = ({
  darkState,
  items,
  filter,
  loading,
  setOpenDeleteModal,
  pathToItem,
  setItemToDelete,
}) => {
  return (
    <Row
      style={{ marginLeft: -60 }}
      gutter={[16, { xs: 8, sm: 10, md: 12, lg: 16 }]}
      justify='center'>
      {loading ? (
        <Space size='large' style={{ margin: '40% 0 50% 0' }}>
          <Spin size='large' />
        </Space>
      ) : (
        items.filter(filter).map((product, index) => (
          <Col
            className='gutter-row'
            offset={1}
            xl={5}
            md={10}
            sm={23}
            style={{ marginBottom: 10 }}
            key={index}>
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
                <Link to={`/admin/${pathToItem}/${product.slug}`}>
                  <EditOutlined
                    type='primary'
                    onClick={() =>
                      console.log(`/admin/${pathToItem}/${product.slug}`)
                    }
                    key='update'>
                    Update
                  </EditOutlined>
                </Link>,
                <DeleteOutlined
                  onClick={() => {
                    setOpenDeleteModal(true);
                    setItemToDelete(product);
                  }}
                  key='delete'
                />,
              ]}>
              <Meta
                style={{ overflow: 'hidden' }}
                avatar={<Avatar src={product.category.image} />}
                title={product.title}
                description={product.description.slice(0, 40).concat('...')}
              />
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default ProductCatalogue;
