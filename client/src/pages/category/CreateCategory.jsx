import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import AdminNavSidebar from '../../components/navigation/AdminNavSidebar';
import { toast, ToastContainer } from 'react-toastify';
import { BiTrashAlt } from 'react-icons/bi';
import { GrUpdate } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategoryThunk,
  getAllCategoriesThunk,
  resetCreateFailure,
} from '../../redux/categories/categoriesSlice';
import NoCategoryImage from '../../assets/categories-images/unordered.jpg';
import { Card, Row, Col, Divider } from 'antd';
import DeleteModal from '../../components/interaction/DeleteModal';
const { Meta } = Card;

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { darkMode: darkState } = useSelector(state => state.theme);
  const { categories, deleteMessage } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [revalidateCategories, setRevalidateCategories] = useState(false);

  const { createdCategory, createCategoryError } = useSelector(
    state => state.categories,
  );
  const { register, handleSubmit, errors, reset } = useForm();
  const [loading, setLoading] = useState(false);

  // console.log(categories);
  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [revalidateCategories]);

  useEffect(() => {
    if (createdCategory) {
      setLoading(false);
      toast.success('Category has been created! 🍾');
    }
  }, [createdCategory]);

  useEffect(() => {
    toast.success(deleteMessage.message);
  }, [deleteMessage]);

  const onSubmit = async data => {
    setLoading(true);
    await dispatch(createCategoryThunk(data, user.token));
    reset();
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

  useEffect(() => {
    if (errors.name) {
      toast.error('Category name was not provided!');
    }
    if (errors.image) {
      toast.error('Image URL is needed for storage purposes');
    }
  }, [errors]);

  return (
    <div
      className={darkState ? 'container-fluid text-white' : 'container-fluid'}
      style={{ backgroundColor: darkState ? '#432371' : 'white' }}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNavSidebar />
        </div>
        <div className='col-md-8 offset-md-1'>
          <div className='container mt-3'>
            <h2 className={darkState ? 'text-white' : ''}>Create Category</h2>
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className='d-flex flex-column'>
              <label htmlFor='category'>New Category Name</label>
              <input
                name='name'
                autoFocus
                id='category'
                ref={register({ required: true, minLength: 3, maxLength: 40 })}
              />
              {errors.name && 'Category name is required. (min: 3, max: 40)'}
              <label style={{ marginTop: 10 }} htmlFor='image'>
                New Category Image URL
              </label>
              <input
                name='image'
                id='image'
                ref={register({ required: true })}
              />
              {errors.image && 'Image for category is required.'}
              <Button
                onClick={handleSubmit(onSubmit)}
                type='primary'
                className='mt-3'
                loading={loading}>
                Create
              </Button>
            </form>
            <Divider
              orientation='left'
              style={{ color: darkState ? 'white' : 'black' }}>
              Manage Categories
            </Divider>
            <Row
              style={{ marginLeft: -60 }}
              gutter={[16, { xs: 8, sm: 10, md: 12, lg: 16 }]}
              justify='center'>
              {categories.map((cat, index) => (
                <Col
                  className='gutter-row'
                  offset={1}
                  xl={5}
                  md={10}
                  sm={23}
                  style={{ marginBottom: 10 }}
                  key={index}>
                  <Card
                    hoverable
                    style={{
                      width: 200,
                      background: darkState ? '#B9E0B5' : 'white',
                    }}
                    cover={
                      <img
                        style={{
                          backgroundSize: 'cover',
                          maxHeight: 190,
                        }}
                        alt={cat.name}
                        src={cat.image || NoCategoryImage}
                      />
                    }>
                    <Meta title={`${cat.name}`} style={{ color: 'white' }} />
                    <Divider orientation='center' style={{ fontSize: 10 }}>
                      Actions
                    </Divider>
                    <div>
                      <Link to={`/admin/category/${cat.slug}`}>
                        <Button
                          type='primary'
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
                          setCategoryToDelete(cat);
                        }}
                        block
                        icon={
                          <BiTrashAlt size='15' style={{ marginRight: 6 }} />
                        }>
                        Delete
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
      <ToastContainer />
      {openDeleteModal && (
        <DeleteModal
          onModalClose={() => setOpenDeleteModal(false)}
          onModalOpen={() => setOpenDeleteModal(true)}
          updateCategories={setRevalidateCategories}
          category={categoryToDelete}
        />
      )}
    </div>
  );
};

export default CreateCategory;
