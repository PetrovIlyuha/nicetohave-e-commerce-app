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

import { BiTrashAlt } from 'react-icons/bi';
import { GrUpdate } from 'react-icons/gr';
import NoCategoryImage from '../../../assets/categories-images/unordered.jpg';
import { motion } from 'framer-motion';
import { zoomIn } from '../subcategories/animations';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
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
                <SettingOutlined key='setting' />,
                <EditOutlined key='edit' />,
                <EllipsisOutlined key='ellipsis' />,
              ]}>
              <Meta
                style={{ overflow: 'hidden' }}
                avatar={<Avatar src={product.category.image} />}
                title={product.title}
                description={product.description.slice(0, 40).concat('...')}
              />
            </Card>
            {/* <Card
            hoverable
            style={{
              width: 200,
              background: darkState ? '#B9E0B5' : 'white',
            }}
            cover={
              <motion.img
                variants={zoomIn}
                initial='hidden'
                animate='show'
                style={{
                  backgroundSize: 'cover',
                  maxHeight: 190,
                  overflow: 'hidden',
                }}
                alt={item.name}
                src={item.image || NoCategoryImage}
              />
            }>
            <Meta title={`${item.name}`} style={{ color: 'white' }} />
            <Divider orientation='center' style={{ fontSize: 10 }}>
              Actions
            </Divider>
            <div>
              <Link to={`/admin/${pathToItem}/${item.slug}`}>
                <Button
                  type='primary'
                  onClick={() =>
                    console.log(`/admin/${pathToItem}/${item.slug}`)
                  }
                  block
                  style={{ marginBottom: 10 }}
                  icon={
                    <GrUpdate
                      color='red'
                      size='12'
                      style={{ marginRight: 5 }}
                    />
                  }>
                  Update
                </Button>
              </Link>
              <Button
                type='danger'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => {
                  setOpenDeleteModal(true);
                  setItemToDelete(item);
                }}
                block
                icon={<BiTrashAlt size='15' style={{ marginRight: 6 }} />}>
                Delete
              </Button>
            </div>
          </Card> */}
          </Col>
        ))
      )}
    </Row>
  );
};

export default ProductCatalogue;
