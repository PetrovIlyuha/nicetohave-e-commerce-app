import React, { useEffect, useState } from 'react';
import { Image, Input } from 'antd';

import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getAllCategoriesThunk } from '../../../redux/categories/categoriesSlice';
import {
  getCategoryByIdThunk,
  clearCreateProductState,
  createProductThunk,
} from '../../../redux/product/productSlice';
import { Divider } from 'antd';
import DeleteModal from '../../../components/interaction/DeleteModal';
import CreateProductForm from './CreateProductForm';
import CatalogueWithFilter from '../category/CatalogueWithFilter';
import { slideInLeft, slideInRight } from '../subcategories/animations';
import { productColors } from './productColors';
import SubDropDown from '../subcategories/SubDropDown';
import styled from 'styled-components';
import MultiSelect from './MultiSelect';
import { getAllSubCategoriesThunk } from '../../../redux/subcategories/subCategoriesSlice';
const { Search } = Input;

const CreateProduct = () => {
  const dispatch = useDispatch();
  const {
    category,
    productCreateSuccess,
    product,
    loading: productCreateLoading,
    productCreateError,
  } = useSelector(state => state.products);

  const { darkMode: darkState } = useSelector(state => state.theme);
  const { categories } = useSelector(state => state.categories);
  const { subcategories } = useSelector(state => state.subcategories);
  const {
    user: { token },
  } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [mainCategorySelect, setMainCategorySelect] = useState(null);

  const [subCategoriesFromMain, setSubCategoriesFromMain] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const categoriesNames = categories?.map(cat => cat.name);

  // Color state management
  const [possibleColors, setPossibleColors] = useState(productColors);

  const [selectedColor, setSelectedColor] = useState(possibleColors.black);

  const onColorSelectChange = value => {
    setSelectedColor(possibleColors[value]);
  };

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
    dispatch(getAllSubCategoriesThunk());
    return () => dispatch(clearCreateProductState());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubCategories.length > 0) {
      const filteredSubs = selectedSubCategories.map(subcat => {
        return subcategories.find(c => c.name === subcat);
      });
      setFilteredSubcategories(filteredSubs);
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedSubCategories, subcategories]);

  useEffect(() => {
    if (category) {
      let subsPartition = subcategories.filter(
        cat => cat.parent === category?._id,
      );
      setSubCategoriesFromMain(subsPartition);
    }
  }, [category, subcategories]);

  useEffect(() => {
    if (product && productCreateSuccess) {
      toast.success(`Product ${product.title} has been created! 🍾`);
    }
  }, [product, productCreateSuccess, dispatch]);

  useEffect(() => {
    if (mainCategorySelect) {
      const findMainCategory = categories.find(
        cat => cat.name === mainCategorySelect,
      );
      dispatch(getCategoryByIdThunk(findMainCategory._id));
    }
  }, [mainCategorySelect, dispatch, categories]);

  useEffect(() => {
    if (productCreateError) {
      toast.error(productCreateError);
    }
  }, [productCreateError, dispatch]);

  const onSubmit = async data => {
    const productData = {
      ...data,
      category: category._id,
      subcategories: filteredSubcategories,
      color: Object.keys(possibleColors).find(
        key => possibleColors[key] === selectedColor,
      ),
    };
    await dispatch(createProductThunk(productData, token));
  };

  return (
    <div
      className={darkState ? 'container-fluid text-white' : 'container-fluid'}
      style={{ backgroundColor: darkState ? '#432371' : '#F0F3F6' }}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNavSidebar fullHeight={!selectedSubCategories.length} />
        </div>
        <div className='col-md-8 offset-md-1'>
          <div className='container mt-3'>
            <motion.h2
              variants={slideInLeft}
              initial='hidden'
              animate='show'
              className={darkState ? 'text-white' : ''}>
              Create New Product
            </motion.h2>
            <motion.div className='my-3'>
              <SubDropDown
                label='Choose Main Category'
                items={categoriesNames}
                selectItem={setMainCategorySelect}
              />
              <div>
                {category ? (
                  <motion.div className='d-flex flex-column mt-2'>
                    <h5 className={darkState ? 'text-white' : ''}>
                      Selected: {category.name}
                    </h5>
                    <Image
                      style={{ margin: '2rem 0', border: '8px solid yellow' }}
                      width={200}
                      src={category.image}
                    />
                  </motion.div>
                ) : (
                  <NoSelectedCategory>
                    <h3 className={darkState ? 'text-white' : ''}>
                      No category Selected
                    </h3>
                  </NoSelectedCategory>
                )}
              </div>
            </motion.div>
            {category && (
              <>
                <Divider className={darkState ? 'text-white' : ''} />
                <motion.h2
                  variants={slideInLeft}
                  initial='hidden'
                  animate='show'
                  className={darkState ? 'text-white' : ''}>
                  Select Sub-categories
                </motion.h2>
                <motion.div className='my-3'>
                  <MultiSelect
                    items={subCategoriesFromMain}
                    setSelected={setSelectedSubCategories}
                    selectedItems={selectedSubCategories}
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
            {filteredSubcategories.length > 0 && (
              <CreateProductForm
                onSubmit={onSubmit}
                loading={productCreateLoading}
                possibleColors={possibleColors}
                success={productCreateSuccess}
                onColorSelectChange={onColorSelectChange}
                selectedColor={selectedColor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NoSelectedCategory = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dotted black;
  margin: 2rem 0;
`;

export default CreateProduct;
