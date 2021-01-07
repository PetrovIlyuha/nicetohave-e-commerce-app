import React, { useEffect, useRef, useState } from 'react';
import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { Image, Col, Row, Typography, Button, Divider, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryByIdThunk,
  getOneProductBySlug,
} from '../../../redux/product/productSlice';
import { fadeIn, slideInLeft, slideInRight } from '../subcategories/animations';
import { motion } from 'framer-motion';
import './UpdateProduct.css';
import { MenuOutlined, UploadOutlined } from '@ant-design/icons';
import useShowSideMenu from '../../../hooks/useShowSideMenu';
import styled from 'styled-components';
import DeleteModal from '../../../components/interaction/DeleteModal';
import SubDropDown from '../subcategories/SubDropDown';
import { getAllCategoriesThunk } from '../../../redux/categories/categoriesSlice';
import { getAllSubCategoriesThunk } from '../../../redux/subcategories/subCategoriesSlice';
import { Link } from 'react-router-dom';
import MultiSelect from './MultiSelect';
const { Title } = Typography;

const UpdateProduct = ({ match }) => {
  const dispatch = useDispatch();
  const { slug } = match.params;
  const { productBySlug, category } = useSelector(state => state.products);

  const { categories } = useSelector(state => state.categories);
  const { subcategories } = useSelector(state => state.subcategories);
  const { darkMode } = useSelector(state => state.theme);
  const [subCategoriesFromMain, setSubCategoriesFromMain] = useState([]);
  const [localData, setLocalData] = useState({});
  const [newCategory, defineNewCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
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
  }, [dispatch, categories, newCategory]);

  useEffect(() => {
    if (category) {
      let subsPartition = subcategories.filter(
        cat => cat.parent === category?._id,
      );
      setSubCategoriesFromMain(subsPartition);
      setLocalData({ ...localData, category: category });
    }
  }, [category, subcategories]);

  useEffect(() => {
    setLocalData({ ...localData, subcategories: selectedSubCategories });
  }, [selectedSubCategories]);

  const {
    description,
    price,
    images,
    brand,
    quantity,
    sold,
    shipping,
    title,
  } = localData;

  console.log('local state', localData);
  return (
    <Row>
      <div className='col-md-3 mr-2'>
        <AdminNavSidebar
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
            <Row>
              {category && (
                <Row spacing={12}>
                  <Col>
                    <StyledMediumBox>
                      This product will be moved to:{' '}
                      <strong>{category.name}</strong>
                    </StyledMediumBox>
                  </Col>
                </Row>
              )}
              <Col span={12}>
                <StyledMediumBox>
                  <SubDropDown
                    label='Need to Change Main Category?'
                    items={categoriesNames}
                    selectItem={defineNewCategory}
                  />
                </StyledMediumBox>
              </Col>
              <Col span={12}>
                <StyledMediumBox>
                  Need to create new category?
                  <Link to='/admin/category'>
                    <Button type='secondary'>Create +</Button>
                  </Link>
                </StyledMediumBox>
              </Col>
            </Row>
            {category && subCategoriesFromMain.length > 0 && (
              <>
                <Divider
                  style={{
                    backgroundColor: darkMode ? 'white' : '',
                    height: '2px',
                  }}
                />
                <motion.h2
                  variants={slideInLeft}
                  initial='hidden'
                  animate='show'
                  className={darkMode ? 'text-white' : ''}>
                  Select Sub-categories
                </motion.h2>
                <motion.div className='my-3'>
                  <MultiSelect
                    items={subCategoriesFromMain}
                    setSelected={setSelectedSubCategories}
                    placeholder={'Select subcategory(ies)'}
                    icon={'📦'}
                  />
                  {selectedSubCategories.length === 1 && (
                    <motion.p
                      variants={slideInRight}
                      initial='hidden'
                      animate='show'>
                      You can select multiple sub-categories by focusing on the
                      field
                    </motion.p>
                  )}
                </motion.div>
              </>
            )}
            <Row>
              <Col span={12}>
                <h6>
                  Need to add New Subcategory?{' '}
                  <Link to='/admin/subcategory/:categoryName'>
                    <Button type='primary' size='small'>
                      Create one.
                    </Button>
                  </Link>
                </h6>
              </Col>
            </Row>
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
                    <Upload>
                      <Button
                        type='primary'
                        size='small'
                        icon={<UploadOutlined />}>
                        Replace with new Photo
                      </Button>
                    </Upload>
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export default UpdateProduct;
