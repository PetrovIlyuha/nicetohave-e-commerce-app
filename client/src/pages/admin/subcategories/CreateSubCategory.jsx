import React, { useEffect, useState } from 'react';
import { Input, Image } from 'antd';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { slideDownFadeIn, slideInLeft } from './animations';
import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSubCategoriesThunk,
  resetSubCategoryCreateFailure,
  createSubCategoryThunk,
  clearCreateSubCategory,
  clearSubCategoryRemovalMessage,
} from '../../../redux/subcategories/subCategoriesSlice.js';
import { Divider } from 'antd';
import DeleteModal from '../../../components/interaction/DeleteModal';
import CreateSubCategoryForm from './CreateSubCategoryForm';
import CatalogueWithFilter from '../category/CatalogueWithFilter';
import SubDropDown from './SubDropDown';
import { throttle } from '../../../utils/fns';
import { withRouter } from 'react-router-dom';
const { Search } = Input;

const CreateSubCategory = ({ match }) => {
  const { categoryName } = match.params;
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { darkMode: darkState } = useSelector(state => state.theme);
  const {
    subcategories,
    deleteMessage,
    createdSubCategory,
    createSubCategoryError,
  } = useSelector(state => state.subcategories);
  const { categories } = useSelector(state => state.categories);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showedSelectedCategory, setShowedSelectedCategory] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
  const [revalidateCategories, setRevalidateCategories] = useState(false);
  const [subsLimitedBySelected, setSubsLimitedBySelected] = useState([]);
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
  }, [categoryName, categories]);

  useEffect(() => {
    dispatch(getAllSubCategoriesThunk());
    setResetForm(false);
  }, [dispatch]);

  useEffect(() => {
    let subsSlice = subcategories.filter(
      cat => cat.parent === showedSelectedCategory?._id,
    );
    setSubsLimitedBySelected(subsSlice);
  }, [subcategories, showedSelectedCategory]);

  useEffect(() => {
    setShowedSelectedCategory(
      categories.find(c => c.name === selectedCategory),
    );
  }, [selectedCategory, dispatch, categories]);

  useEffect(() => {
    dispatch(getAllSubCategoriesThunk());
  }, [revalidateCategories, dispatch]);

  useEffect(() => {
    if (createdSubCategory) {
      setLoading(false);
      toast.success('Sub-Category has been created! 🍾');
      setTimeout(() => {
        dispatch(clearCreateSubCategory());
      }, 1000);
    }
  }, [createdSubCategory, dispatch]);

  useEffect(() => {
    if (deleteMessage) {
      toast.success(deleteMessage.message);
      setTimeout(() => {
        dispatch(clearSubCategoryRemovalMessage());
      }, 1000);
    }
  }, [deleteMessage, dispatch]);

  const onSubmit = async data => {
    const parentCategoryId = showedSelectedCategory._id;
    const subCategoryData = { ...data, parentCategoryId };
    setLoading(true);
    await dispatch(createSubCategoryThunk(subCategoryData, user.token));
    setResetForm(true);
    dispatch(getAllSubCategoriesThunk());
  };

  useEffect(() => {
    if (createSubCategoryError) {
      setLoading(false);
      toast.error(createSubCategoryError.error);
    }
    return () => {
      dispatch(resetSubCategoryCreateFailure());
    };
  }, [createSubCategoryError, dispatch]);

  const searchCategories = e => {
    setSearchTerm(e.target.value);
  };

  const throttledSearchCategories = throttle(searchCategories, 1400);

  const subCategoryFilter = subcategory =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase());

  const categoriesNames = categories?.map(cat => cat.name);

  return (
    <div
      className={darkState ? 'container-fluid text-white' : 'container-fluid'}
      style={{ backgroundColor: darkState ? '#432371' : '#F0F3F6' }}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNavSidebar
            fullHeight={
              searchTerm.length > 0 ||
              subcategories.length === 0 ||
              subsLimitedBySelected.length === 0
                ? true
                : false
            }
          />
        </div>
        <div className='col-md-8 offset-md-1'>
          <div className='container mt-3'>
            <motion.h2
              variants={slideInLeft}
              initial='hidden'
              animate='show'
              className={darkState ? 'text-white' : ''}>
              Create Sub-Category
            </motion.h2>
            <Divider
              style={{
                backgroundColor: darkState ? 'white' : '',
                height: '2px',
              }}
            />
            <div className='row'>
              <div className='col-md-4'>
                <SubDropDown
                  label='Choose Category'
                  items={categoriesNames}
                  selectItem={setSelectedCategory}
                />
                <div>
                  {showedSelectedCategory ? (
                    <motion.div className='d-flex flex-column mt-2'>
                      <h5 className={darkState ? 'text-white' : ''}>
                        Selected: {showedSelectedCategory.name}
                      </h5>
                      <Image
                        style={{ margin: '2rem 0', border: '8px solid yellow' }}
                        width={200}
                        src={showedSelectedCategory.image}
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
              </div>
              <div className='col-md-4 offset-md-2 mt-5'>
                {showedSelectedCategory && (
                  <motion.div
                    variants={slideDownFadeIn}
                    initial='hidden'
                    animate='show'
                    exit='exit'>
                    <CreateSubCategoryForm
                      onSubmit={onSubmit}
                      resetForm={resetForm}
                      loading={loading}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {showedSelectedCategory && (
              <motion.div
                variants={slideDownFadeIn}
                initial='hidden'
                animate='show'
                exit='exit'>
                {subsLimitedBySelected.length > 0 ? (
                  <>
                    <Divider
                      orientation='left'
                      style={{ color: darkState ? 'white' : 'black' }}>
                      Manage All SubCategories for{' '}
                      {showedSelectedCategory?.name}
                    </Divider>
                    <Search
                      className='mb-4 mt-2'
                      placeholder='input search text'
                      allowClear
                      onChange={e => throttledSearchCategories(e)}
                      enterButton='Search'
                      size='large'
                    />
                    <CatalogueWithFilter
                      darkState={darkState}
                      items={subsLimitedBySelected || []}
                      pathToItem='subcategory'
                      filter={subCategoryFilter}
                      setOpenDeleteModal={setOpenDeleteModal}
                      setItemToDelete={setSubCategoryToDelete}
                    />
                  </>
                ) : (
                  <div>Empty Category</div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {openDeleteModal && (
        <DeleteModal
          title='Subcategory'
          onModalClose={() => setOpenDeleteModal(false)}
          onModalOpen={() => setOpenDeleteModal(true)}
          updateItems={setRevalidateCategories}
          item={subCategoryToDelete}
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

export default withRouter(CreateSubCategory);
