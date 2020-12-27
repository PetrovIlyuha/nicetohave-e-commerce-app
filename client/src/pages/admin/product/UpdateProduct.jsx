import React, { useEffect, useRef, useState } from 'react';
import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { Carousel, Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProductBySlug } from '../../../redux/product/productSlice';
import { fadeIn } from '../subcategories/animations';
import { motion } from 'framer-motion';
const { Title } = Typography;

const UpdateProduct = ({ match }) => {
  const { slug } = match.params;
  const { productBySlug } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [updateDescription, setUpdateDescription] = useState(false);
  const [localData, setLocalData] = useState({
    description: '',
  });
  const { description } = localData;
  const descriptionRef = useRef();
  useEffect(async () => {
    await dispatch(getOneProductBySlug(slug));
    setLocalData({ ...localData, description: productBySlug[0].description });
  }, [slug]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [descriptionRef]);

  return (
    <Row>
      <div className='col-md-3'>
        <AdminNavSidebar fullHeight />
      </div>
      {productBySlug && (
        <div className='col-lg-6 offset-lg-3 col-md-8 mx-1 mt-3'>
          <div>
            <h2>{productBySlug[0]?.title}</h2>
            <div className='col-8'>
              <Carousel
                md={8}
                autoplay
                autoplaySpeed={8000}
                dots={{ padding: '2rem', color: 'red' }}>
                {productBySlug[0].images.map((img, idx) => (
                  <img key={idx} src={img.url} />
                ))}
              </Carousel>
            </div>
            <motion.div variants={fadeIn} initial='hidden' animate='show'>
              <Title level={4} className='mt-5'>
                {updateDescription
                  ? 'Click outside to finish editing'
                  : 'Click on the text to update'}
              </Title>
            </motion.div>
            {updateDescription ? (
              <textarea
                style={{ width: '100%', minHeight: '100px' }}
                ref={descriptionRef}
                onChange={e =>
                  setLocalData({ ...localData, description: e.target.value })
                }
                onBlur={() => setUpdateDescription(false)}>
                {description}
              </textarea>
            ) : (
              <Typography onClick={() => setUpdateDescription(true)}>
                {description}
              </Typography>
            )}
          </div>
        </div>
      )}
    </Row>
  );
};

export default UpdateProduct;
