import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import ColorPickerDropdown from './ColorPickerDropdown';

const CreateCategoryForm = ({
  onSubmit,
  loading,
  possibleColors,
  onColorSelectChange,
  selectedColor,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm();

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
    <React.Fragment>
      <form className='d-flex flex-column form-group container'>
        <div className='row'>
          <div className='col-md-6'>
            <label htmlFor='title' class='form-label mt-3'>
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
          </div>
          <div className='col-md-6'>
            <label htmlFor='image' class='form-label my-2'>
              Description
            </label>
            <textarea
              class='form-control'
              name='description'
              style={{ color: 'black' }}
              id='description'
              ref={register({ required: true, maxLength: 2000 })}
            />
            {errors.description &&
              'Description  is a required field. (max: 2000 characters)'}
          </div>
          <div className='col-6'>
            <label htmlFor='price' class='form-label mt-5'>
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
          </div>
          <div className='col-6'>
            <label htmlFor='quantity' class='form-label mt-5'>
              Quantity
            </label>
            <input
              name='quantity'
              id='quantity'
              class='form-control'
              type='number'
              style={{ color: 'black' }}
              ref={register({ pattern: /^[0-9]+$/gi })}
            />
            {errors.quantity && 'Please specify the quantity.'}
          </div>
          <div className='col-6'>
            <label htmlFor='color' class='form-label mt-5'>
              Product Color
            </label>
            <ColorPickerDropdown
              name='color'
              ref={register()}
              items={possibleColors}
              selectItem={onColorSelectChange}
            />
            {selectedColor && (
              <div
                className='mt-3'
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                  backdropFilter:
                    'blur(20px) saturate(160%) contrast(45%) brightness(140%)',
                  backgroundColor: selectedColor,
                }}></div>
            )}
          </div>
          <div className='col-6'>
            <label htmlFor='sold' class='form-label mt-5'>
              Sold
            </label>
            <input
              name='sold'
              id='sold'
              class='form-control'
              type='number'
              style={{ color: 'black' }}
              ref={register({ pattern: /^[0-9]+$/gi })}
            />
            {errors.quantity && 'Please provide the amount sold.'}
          </div>
          <div className='col-md-6 mt-4'>
            <label htmlFor='brand' class='form-label mt-3'>
              Product Brand
            </label>
            <input
              class='form-control'
              name='brand'
              style={{ color: 'black' }}
              id='brand'
              ref={register({ required: true, minLength: 3, maxLength: 40 })}
            />
            {errors.brand && 'Product brand is required. (min: 3, max: 40)'}
          </div>
          <div className='col-md-6 my-1'>
            <label htmlFor='shipping' class='form-label mt-5'>
              Shipping Possible
            </label>
            <div className='mt-3'>
              <input
                type='checkbox'
                name='shipping'
                ref={register()}
                label='Shipping'
              />
            </div>
          </div>
          <div className='col-12'>
            <label htmlFor='image' class='form-label mt-5'>
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
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            type='primary'
            className='my-5'>
            Create
          </Button>
        </div>
      </form>
      <ToastContainer />
    </React.Fragment>
  );
};

export default CreateCategoryForm;
