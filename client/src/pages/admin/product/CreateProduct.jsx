import React, { useEffect, useState } from 'react';
import { Image, Input } from 'antd';

import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { toast, ToastContainer } from 'react-toastify';
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
import { slideInLeft } from '../subcategories/animations';
import SubDropDown from '../subcategories/SubDropDown';
import styled from 'styled-components';
import MultiSelect from './MultiSelect';
import { getAllSubCategoriesThunk } from '../../../redux/subcategories/subCategoriesSlice';
const { Search } = Input;

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector(state => state.products);
  const { darkMode: darkState } = useSelector(state => state.theme);
  const { categories, deleteMessage } = useSelector(state => state.categories);
  const { subcategories } = useSelector(state => state.subcategories);
  const { category } = useSelector(state => state.products);
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

  // useEffect(() => {
  //   if (createdCategory) {
  //     setLoading(false);
  //     toast.success('Category has been created! 🍾');
  //     setTimeout(() => {
  //       dispatch(clearCreateCategory());
  //     }, 1000);
  //   }
  // }, [createdCategory, dispatch]);

  useEffect(() => {
    if (mainCategorySelect) {
      const findMainCategory = categories.find(
        cat => cat.name === mainCategorySelect,
      );
      dispatch(getCategoryByIdThunk(findMainCategory._id));
    }
  }, [mainCategorySelect, dispatch, categories]);

  // useEffect(() => {
  //   if (deleteMessage) {
  //     toast.success(deleteMessage.message);
  //     setTimeout(() => {
  //       dispatch(clearRemovalMessage());
  //     }, 1000);
  //   }
  // }, [deleteMessage, dispatch]);

  const onSubmit = async data => {
    setLoading(true);
    const productData = {
      ...data,
      category: category._id,
      subcategories: filteredSubcategories,
    };
    console.log(productData);
    console.log('about to create new product', data);
    // await dispatch(createProductThunk({ data }, token));
    // dispatch(getAllCategoriesThunk());
  };

  return (
    <div
      className={darkState ? 'container-fluid text-white' : 'container-fluid'}
      style={{ backgroundColor: darkState ? '#432371' : '#F0F3F6' }}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNavSidebar fullHeight={true} />
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
                    <motion.p>
                      You can select multiple sub-categories by focusing on the
                      field
                    </motion.p>
                  )}
                </motion.div>
              </>
            )}
            {filteredSubcategories.length > 0 && (
              <CreateProductForm onSubmit={onSubmit} loading={loading} />
            )}
            {/* <Divider
              orientation='left'
              style={{ color: darkState ? 'white' : 'black' }}>
              Manage Categories
            </Divider> */}

            {/* <CatalogueWithFilter
              darkState={darkState}
              pathToItem='category'
              items={categories}
              // filter={categoryFilter}
              setOpenDeleteModal={setOpenDeleteModal}
              // setItemToDelete={setCategoryToDelete}
            /> */}
          </div>
        </div>
      </div>
      <ToastContainer />
      {openDeleteModal && (
        <DeleteModal
          title='Category'
          onModalClose={() => setOpenDeleteModal(false)}
          onModalOpen={() => setOpenDeleteModal(true)}
          // updateItems={setRevalidateCategories}
          // item={categoryToDelete}
        />
      )}
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
