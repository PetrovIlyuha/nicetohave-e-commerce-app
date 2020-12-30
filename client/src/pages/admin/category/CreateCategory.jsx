import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  createCategoryThunk,
  getAllCategoriesThunk,
  resetCreateFailure,
  clearCreateCategory,
  clearRemovalMessage,
} from '../../../redux/categories/categoriesSlice';
import { Divider } from 'antd';
import DeleteModal from '../../../components/interaction/DeleteModal';
import CreateCategoryForm from './CreateCategoryForm';
import CatalogueWithFilter from './CatalogueWithFilter';
import { slideInLeft } from '../subcategories/animations';
import { throttle } from '../../../utils/fns';
import useShowSideMenu from '../../../hooks/useShowSideMenu';
import { MenuOutlined } from '@ant-design/icons';
const { Search } = Input;

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { darkMode: darkState } = useSelector(state => state.theme);
  const { categories, deleteMessage } = useSelector(state => state.categories);
  const [loading, setLoading] = useState(false);
  const [artificialLoading, setArtificialLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [revalidateCategories, setRevalidateCategories] = useState(false);

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  const { createdCategory, createCategoryError } = useSelector(
    state => state.categories,
  );
  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [revalidateCategories, dispatch]);

  useEffect(() => {
    if (createdCategory) {
      setLoading(false);
      toast.success('Category has been created! 🍾');
      setTimeout(() => {
        dispatch(clearCreateCategory());
      }, 1000);
    }
  }, [createdCategory, dispatch]);

  useEffect(() => {
    if (deleteMessage) {
      toast.success(deleteMessage.message);
      setTimeout(() => {
        dispatch(clearRemovalMessage());
      }, 1000);
    }
  }, [deleteMessage, dispatch]);

  const onSubmit = async data => {
    setLoading(true);
    await dispatch(createCategoryThunk(data, user.token));
    dispatch(getAllCategoriesThunk());
  };

  useEffect(() => {
    if (createCategoryError) {
      setLoading(false);
      toast.error(createCategoryError.error);
    }
    return () => {
      dispatch(resetCreateFailure());
    };
  }, [createCategoryError, dispatch]);

  const searchCategories = e => {
    setSearchTerm(e.target.value);
  };

  const throttleSearch = throttle(searchCategories, 1500, setArtificialLoading);

  const categoryFilter = category => {
    return category.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const [showSidebar, setShowSidebar, showMenuIcon] = useShowSideMenu();
  return (
    <div
      className={darkState ? 'container-fluid text-white' : 'container-fluid'}
      style={{ backgroundColor: darkState ? '#432371' : '#F0F3F6' }}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNavSidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            fullHeight={
              searchTerm.length > 0 || artificialLoading ? true : false
            }
          />
        </div>
        <div className='col-md-8 offset-md-1'>
          {showMenuIcon && (
            <MenuOutlined
              style={{ position: 'absolute', right: 40, top: 20 }}
              onClick={() => setShowSidebar(true)}
            />
          )}
          <div className='container mt-3'>
            <motion.h2
              variants={slideInLeft}
              initial='hidden'
              animate='show'
              className={darkState ? 'text-white' : ''}>
              Create Category
            </motion.h2>
            <CreateCategoryForm onSubmit={onSubmit} loading={loading} />
            <Divider
              orientation='left'
              style={{ color: darkState ? 'white' : 'black' }}>
              Manage Categories
            </Divider>
            <Search
              className='mb-4 mt-2'
              placeholder='input search text'
              allowClear
              onChange={e => throttleSearch(e)}
              enterButton='Search'
              size='large'
            />
            {!artificialLoading ? (
              <CatalogueWithFilter
                darkState={darkState}
                pathToItem='category'
                items={categories}
                filter={categoryFilter}
                setOpenDeleteModal={setOpenDeleteModal}
                setItemToDelete={setCategoryToDelete}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>

      {openDeleteModal && (
        <DeleteModal
          title='Category'
          onModalClose={() => setOpenDeleteModal(false)}
          onModalOpen={() => setOpenDeleteModal(true)}
          updateItems={setRevalidateCategories}
          item={categoryToDelete}
        />
      )}
    </div>
  );
};

export default CreateCategory;
