import React, { useEffect, useRef, useState } from 'react';
import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { Image, Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProductBySlug } from '../../../redux/product/productSlice';
import { fadeIn } from '../subcategories/animations';
import { motion } from 'framer-motion';
import './UpdateProduct.css';
import { MenuOutlined } from '@ant-design/icons';
import useShowSideMenu from '../../../hooks/useShowSideMenu';
import styled from 'styled-components';
const { Title } = Typography;

const UpdateProduct = ({ match }) => {
  const { slug } = match.params;
  const { productBySlug } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [updateDescription, setUpdateDescription] = useState(false);
  const [localData, setLocalData] = useState({
    description: '',
    price: 0,
    images: [],
  });

  const [showSidebar, setShowSidebar, showMenuIcon] = useShowSideMenu();

  const descriptionRef = useRef();
  useEffect(async () => {
    await dispatch(getOneProductBySlug(slug));
    if (productBySlug) {
      setLocalData({
        ...localData,
        description: productBySlug[0]?.description,
        price: productBySlug[0]?.price,
        images: productBySlug[0]?.images,
      });
      console.log(productBySlug[0]);
    }
  }, [slug]);
  console.log(productBySlug[0]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [descriptionRef]);

  const { description, price, images } = localData;

  return (
    <Row>
      <div className='col-md-3 mr-2'>
        <AdminNavSidebar
          fullHeight
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
      {productBySlug && (
        <div className='col-lg-6 offset-lg-3 col-md-8 mx-1 mt-3'>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2>{productBySlug[0]?.title}</h2>
              {showMenuIcon && (
                <MenuOutlined
                  onClick={e => {
                    e.stopPropagation();
                    setShowSidebar(true);
                  }}
                />
              )}
            </div>
            <Row className='image__gallery--update'>
              {images?.map(image => (
                <Col
                  className='gutter-row'
                  lg={6}
                  md={12}
                  sm={24}
                  key={image.public_id}>
                  <Image width={200} src={image.url} />
                </Col>
              ))}
            </Row>
            <motion.div variants={fadeIn} initial='hidden' animate='show'>
              <Title level={5} className='mt-5'>
                {updateDescription
                  ? 'Click outside to finish editing'
                  : 'Click on the text to update'}
              </Title>
            </motion.div>
            {updateDescription ? (
              <>
                <label htmlFor='description'>Product Description</label>
                <textarea
                  id='description'
                  style={{ width: '100%', minHeight: '100px' }}
                  ref={descriptionRef}
                  onChange={e =>
                    setLocalData({ ...localData, description: e.target.value })
                  }
                  onBlur={() => setUpdateDescription(false)}>
                  {description}
                </textarea>
              </>
            ) : (
              <>
                <label htmlFor='description'>Product Description</label>
                <StyledTypography
                  onClick={() => setUpdateDescription(true)}
                  id='description'>
                  {description}
                </StyledTypography>
              </>
            )}
          </div>
        </div>
      )}
    </Row>
  );
};

const StyledTypography = styled(Typography)`
  padding: 3px;
  &:hover {
    border: 1px dotted grey;
    cursor: pointer;
  }
`;

export default UpdateProduct;
