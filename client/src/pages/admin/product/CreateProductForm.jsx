import React, { useEffect } from 'react';
import { Input } from 'antd';

import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
const { TextArea } = Input;

const CreateCategoryForm = ({ onSubmit, loading }) => {
  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    if (errors.name) {
      toast.error('Product name was not provided!');
      return;
    }
    if (errors.image) {
      toast.error('Please provide an URL for the image');
      return;
    }
  }, [errors]);

  return (
    <form className='d-flex flex-column form-group'>
      <label htmlFor='title' class='form-label'>
        Product Title
      </label>
      <input
        class='form-control'
        name='title'
        autoFocus
        style={{ color: 'black' }}
        id='title'
        ref={register({ required: true, minLength: 3, maxLength: 40 })}
      />
      {errors.name && 'Product name is required. (min: 3, max: 40)'}
      <label style={{ marginTop: 10 }} htmlFor='image' class='form-label'>
        Description
      </label>
      <TextArea
        class='form-control'
        name='description'
        style={{ color: 'black' }}
        id='description'
        ref={register({ required: true, maxLength: 2000 })}
      />
      {errors.description &&
        'Description  is a required field. (max: 2000 characters)'}
      <label style={{ marginTop: 10 }} htmlFor='price' class='form-label'>
        Price
      </label>
      <input
        name='price'
        id='price'
        class='form-control'
        type='number'
        style={{ color: 'black' }}
        ref={register({ pattern: /^[0-9]+$/gi })}
      />
      {errors.price && 'Price must be provided.'}
      <label style={{ marginTop: 10 }} htmlFor='image' class='form-label'>
        New Product Image URL
      </label>
      <input
        name='image'
        class='form-control'
        id='image'
        style={{ color: 'black' }}
        ref={register({ required: true })}
      />
      {errors.image && 'Image for product is required.'}
      <Button
        onClick={handleSubmit(onSubmit)}
        type='primary'
        className='mt-3'
        loading={loading}>
        Create
      </Button>
      <ToastContainer />
    </form>
  );
};

export default CreateCategoryForm;
