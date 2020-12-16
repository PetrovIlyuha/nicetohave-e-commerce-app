import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineIssuesClose } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import ColorPickerDropdown from './ColorPickerDropdown';
import { motion } from 'framer-motion';
import { slideInLeft } from '../subcategories/animations';

const CreateCategoryForm = ({
  onSubmit,
  loading,
  success,
  possibleColors,
  onColorSelectChange,
  selectedColor,
}) => {
  const { darkMode } = useSelector(state => state.theme);
  const { register, handleSubmit, errors, reset, watch, getValues } = useForm();
  const watchTitle = watch('title', '');
  const watchDescr = watch('description', '');
  const watchPrice = watch('price', 0);
  const watchQuantity = watch('quantity', 0);
  const watchSold = watch('sold', 0);
  const watchBrand = watch('brand', '');
  const watchImage = watch('image', '');
  const urlPattern = /^https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;

  const [errorIcons, setErrorIcons] = useState({
    title: false,
    description: false,
    price: false,
  });
  const { title, description, price } = errorIcons;

  useEffect(() => {
    const errorsInt = setInterval(() => {
      setErrorIcons({ title: false, description: false });
    }, 5000);

    return () => clearInterval(errorsInt);
  }, []);

  useEffect(() => {
    if (errors.title) {
      toast.error('Product name was not provided!');
      return;
    }
    if (errors.image) {
      toast.error('Please provide an URL for the image');
      return;
    }
    if (errors.quantity) {
      toast.error('Product reserve is required!');
    }
  }, [errors]);

  useEffect(() => {
    if (success) {
      console.log('product has been created!*****');
      reset();
    }
  }, [success, reset]);

  return (
    <motion.div
      variants={slideInLeft}
      initial='hidden'
      animate='show'
      exit='exit'>
      <form className='d-flex flex-column form-group container'>
        <div className='row'>
          <div className='col-md-6'>
            {/* Title field */}
            <label htmlFor='title' class='form-label mt-3'>
              Product Title
              {!title ? null : watchTitle.length < 3 ||
                watchTitle.length > 40 ? (
                <AiOutlineIssuesClose size={20} color='red' />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} color='green' />
              )}
            </label>
            <input
              class='form-control'
              name='title'
              onBlur={() => setErrorIcons({ ...errorIcons, title: true })}
              autoFocus
              style={{
                backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
              }}
              id='title'
              ref={register({ required: true, minLength: 3, maxLength: 40 })}
            />
            {errors.title && 'Product name is required. (min: 3, max: 40)'}
          </div>
          {/* End of Title field */}
          {/* Description Field */}
          <div className='col-md-6'>
            <label htmlFor='description' class='form-label my-2'>
              Description{' '}
              {!description ? null : watchDescr.length < 15 ||
                watchDescr.length > 2000 ? (
                <AiOutlineIssuesClose size={20} color='red' />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} color='green' />
              )}
            </label>
            <textarea
              class='form-control'
              name='description'
              onBlur={() => setErrorIcons({ ...errorIcons, description: true })}
              style={{
                backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
              }}
              id='description'
              ref={register({ required: true, maxLength: 2000 })}
            />
            {errors.description &&
              'Description  is a required field. (max: 2000 characters)'}
          </div>
          {/* EOF Description Field */}
          {/* Price field */}
          <div className='col-6'>
            <label htmlFor='price' class='form-label mt-5'>
              Price
              {!price ? null : watchPrice <= 0 ? (
                <AiOutlineIssuesClose size={20} color='red' />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} color='green' />
              )}
            </label>
            <input
              name='price'
              id='price'
              class='form-control'
              onBlur={() => setErrorIcons({ ...errorIcons, price: true })}
              type='number'
              style={{
                backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
              }}
              ref={register({ pattern: /^[0-9]+$/gi })}
            />
            {errors.price && 'Price must be provided.'}
          </div>
          {/* EOF Price field */}
          <div className='col-6'>
            <label htmlFor='quantity' class='form-label mt-5'>
              Quantity{' '}
              {watchQuantity <= 0 ? (
                <AiOutlineIssuesClose size={20} color='red' />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} color='green' />
              )}
            </label>
            <input
              name='quantity'
              id='quantity'
              class='form-control'
              type='number'
              style={{
                backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
              }}
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
                  boxShadow: darkMode
                    ? '3px 3px 10px rgba(200,200,200,0.3)'
                    : '3px 3px 10px rgba(0,0,0,0.3)',
                  backdropFilter:
                    'blur(20px) saturate(160%) contrast(45%) brightness(140%)',
                  backgroundColor: selectedColor,
                }}></div>
            )}
          </div>
          <div className='col-6'>
            <label htmlFor='sold' class='form-label mt-5'>
              Sold{' '}
              {watchSold <= 0 ? (
                <AiOutlineIssuesClose size={20} color='red' />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} color='green' />
              )}
            </label>
            <input
              name='sold'
              id='sold'
              class='form-control'
              type='number'
              style={{
                backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
              }}
              ref={register({ pattern: /^[0-9]+$/gi })}
            />
            {errors.sold && 'Please provide the amount sold.'}
          </div>
          <div className='col-md-6 mt-4'>
            <label htmlFor='brand' class='form-label mt-3'>
              Product Brand{' '}
              {watchBrand.length < 3 ? (
                <AiOutlineIssuesClose size={20} color='red' />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} color='green' />
              )}
            </label>
            <input
              class='form-control'
              name='brand'
              style={{
                backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
              }}
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
              {!urlPattern.test(watchImage) ? (
                <AiOutlineIssuesClose size={20} color='red' />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} color='green' />
              )}
            </label>
            <input
              name='image'
              class='form-control'
              id='image'
              style={{
                backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
              }}
              ref={register({ required: true })}
            />
            {errors.image && 'Image url is not valid...'}
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            type='primary'
            loading={loading}
            className='my-5'>
            Create
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

const CreateCategoryFormMemo = React.memo(CreateCategoryForm);
export default CreateCategoryFormMemo;
