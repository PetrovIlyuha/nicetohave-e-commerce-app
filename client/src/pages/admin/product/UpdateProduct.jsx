import React, { useEffect, useRef, useState } from 'react';
import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { Image, Col, Row, Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryByIdThunk,
  getOneProductBySlug,
} from '../../../redux/product/productSlice';
import { fadeIn } from '../subcategories/animations';
import { motion } from 'framer-motion';
import './UpdateProduct.css';
import { MenuOutlined } from '@ant-design/icons';
import useShowSideMenu from '../../../hooks/useShowSideMenu';
import styled from 'styled-components';
import DeleteModal from '../../../components/interaction/DeleteModal';
import SubDropDown from '../subcategories/SubDropDown';
import { getAllCategoriesThunk } from '../../../redux/categories/categoriesSlice';
import { getAllSubCategoriesThunk } from '../../../redux/subcategories/subCategoriesSlice';
const { Title } = Typography;

const UpdateProduct = ({ match }) => {
  const { slug } = match.params;
  const { productBySlug, category } = useSelector(state => state.products);

  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const { subcategories } = useSelector(state => state.subcategories);
  const [subCategoriesFromMain, setSubCategoriesFromMain] = useState([]);
  const [localData, setLocalData] = useState({});
  const [newCategory, defineNewCategory] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateDescription, setUpdateDescription] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [revalidateProduct, setRevalidateProduct] = useState(false);

  const [showSidebar, setShowSidebar, showMenuIcon] = useShowSideMenu();
  const categoriesNames = categories?.map(cat => cat.name);
  const descriptionRef = useRef();

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
    dispatch(getAllSubCategoriesThunk());
  }, [dispatch]);

  const getProductBySlug = async slug => {
    await dispatch(getOneProductBySlug(slug));
    if (productBySlug) {
      setLocalData(productBySlug[0]);
    }
  };
  useEffect(() => {
    getProductBySlug(slug);
  }, [slug]);

  useEffect(() => {
    if (revalidateProduct) getProductBySlug(slug);
  }, [revalidateProduct]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [descriptionRef]);

  useEffect(() => {
    if (newCategory) {
      const newParentCategory = categories.find(
        cat => cat.name === newCategory,
      );
      dispatch(getCategoryByIdThunk(newParentCategory._id));
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (category) {
      let subsPartition = subcategories.filter(
        cat => cat.parent === category?._id,
      );
      setSubCategoriesFromMain(subsPartition);
    }
  }, [category, subcategories]);

  const { description, price, images } = localData;

  console.log(category);
  console.log('Subcategories from new parent', subCategoriesFromMain);

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
            <StyledMediumBox>
              <SubDropDown
                label='Need to Change Main Category?'
                items={categoriesNames}
                selectItem={defineNewCategory}
              />
            </StyledMediumBox>
            <Row className='image__gallery--update'>
              {images?.map(image => (
                <Col
                  className='gutter-row'
                  lg={6}
                  md={12}
                  sm={24}
                  key={image.public_id}>
                  <Image width={200} src={image.url} />
                  <ImageActionButtons justify='between'>
                    <Button
                      type='danger'
                      size='small'
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setImageToDelete(image);
                      }}>
                      Delete
                    </Button>
                    <Button type='primary' size='small'>
                      Upload & Replace
                    </Button>
                  </ImageActionButtons>
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
      {openDeleteModal && (
        <DeleteModal
          title='Image'
          item={imageToDelete}
          onModalOpen={openDeleteModal}
          onModalClose={() => setOpenDeleteModal(false)}
          updateItems={() => setRevalidateProduct(true)}
        />
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

const ImageActionButtons = styled(Row)`
  position: absolute;
  top: 140;
`;

const StyledMediumBox = styled.div`
  padding: 2rem;
`;

export default UpdateProduct;
