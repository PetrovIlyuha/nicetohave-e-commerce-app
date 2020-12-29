import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideInLeft } from '../subcategories/animations';
import ColorPickerDropdown from './ColorPickerDropdown';

import { AiOutlineIssuesClose } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import FileResizer from 'react-image-file-resizer';
import FilesUploader from './ImageFileUpload';

const CreateCategoryForm = ({
  onSubmit,
  loading,
  success,
  possibleColors,
  onColorSelectChange,
  selectedColor,
  setProductImages,
  productImages,
}) => {
  const { darkMode } = useSelector(state => state.theme);
  const {
    user: { token },
  } = useSelector(state => state.user);
  const { register, handleSubmit, errors, reset, watch, getValues } = useForm();
  const titleError =
    watch('title', '').length < 3 || watch('title', '').length > 40;
  const descriptionError =
    watch('description', '').length < 15 ||
    watch('description', '').length > 2000;
  const priceError = watch('price', 0) <= 0;
  const watchQuantity = watch('quantity', 0) <= 0;
  const watchSold = watch('sold', 0) <= 0;
  const watchBrand = watch('brand', '').length < 2;

  const [images, setImages] = useState([]);
  const [errorIcons, setErrorIcons] = useState({
    title: false,
    description: false,
    price: false,
    quantity: false,
    sold: false,
    brand: false,
    image: false,
  });
  const { title, description, price, quantity, sold, brand } = errorIcons;

  const cloudinaryResizeUpload = fileList => {
    const loadedImages = [];
    if (fileList.length > 0) {
      fileList.forEach(file => {
        FileResizer.imageFileResizer(
          file,
          480,
          360,
          'JPEG',
          100,
          0,
          uri => {
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                { headers: { token } },
              )
              .then(res => {
                loadedImages.push(res.data);
              });
          },
          'base64',
        );
      });
    }
    setProductImages([...loadedImages]);
  };

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
      console.log('product has been created!');
      reset();
    }
  }, [success, reset]);

  return (
    <AnimatePresence>
      <motion.div
        variants={slideInLeft}
        initial='hidden'
        animate='show'
        exit='exit'>
        <form className='d-flex flex-column form-group container'>
          <div className='row'>
            {/* Title field */}
            <div className='col-md-6'>
              <label htmlFor='title' class='form-label mt-3'>
                Product Title
                {title ? (
                  <AiOutlineIssuesClose size={20} color='red' />
                ) : (
                  <IoMdCheckmarkCircleOutline size={20} color='green' />
                )}
              </label>
              <input
                autoComplete={false}
                class='form-control'
                name='title'
                onChange={() => {
                  if (titleError) {
                    setErrorIcons({ ...errorIcons, title: true });
                  } else {
                    setErrorIcons({ ...errorIcons, title: false });
                  }
                }}
                onBlur={() => {
                  if (titleError) {
                    setErrorIcons({ ...errorIcons, title: true });
                  } else {
                    setErrorIcons({ ...errorIcons, title: false });
                  }
                }}
                autoFocus
                style={{
                  backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
                }}
                id='title'
                ref={register({ required: true, minLength: 3, maxLength: 40 })}
              />
              {titleError && (
                <motion.p variants={fadeIn} initial='hidden' animate='show'>
                  Product name is required. (min: 3, max: 40)
                </motion.p>
              )}
            </div>
            {/* End of Title field */}
            {/* Description Field */}
            <div className='col-md-6'>
              <label htmlFor='description' class='form-label my-2'>
                Description{' '}
                {description ? (
                  <AiOutlineIssuesClose size={20} color='red' />
                ) : (
                  <IoMdCheckmarkCircleOutline size={20} color='green' />
                )}
              </label>
              <textarea
                class='form-control'
                name='description'
                onBlur={() => {
                  if (descriptionError) {
                    setErrorIcons({ ...errorIcons, description: true });
                  } else {
                    setErrorIcons({ ...errorIcons, description: false });
                  }
                }}
                onChange={() => {
                  if (descriptionError) {
                    setErrorIcons({ ...errorIcons, description: true });
                  } else {
                    setErrorIcons({ ...errorIcons, description: false });
                  }
                }}
                style={{
                  backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
                }}
                id='description'
                ref={register({ required: true, maxLength: 2000 })}
              />
              {descriptionError && (
                <motion.p variants={fadeIn} initial='hidden' animate='show'>
                  Description is a required field. (min: 15, max: 2000 letters)
                </motion.p>
              )}
            </div>
            {/* EOF Description Field */}
            {/* Price field */}
            <div className='col-6'>
              <label htmlFor='price' class='form-label mt-5'>
                Price
                {priceError ? (
                  <AiOutlineIssuesClose size={20} color='red' />
                ) : (
                  <IoMdCheckmarkCircleOutline size={20} color='green' />
                )}
              </label>
              <input
                name='price'
                id='price'
                class='form-control'
                onBlur={() => {
                  if (priceError) {
                    setErrorIcons({ ...errorIcons, price: true });
                  } else {
                    setErrorIcons({ ...errorIcons, price: true });
                  }
                }}
                onChange={() => setErrorIcons({ ...errorIcons, price: true })}
                type='number'
                style={{
                  backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
                }}
                ref={register({ pattern: /^[0-9]+$/gi })}
              />
              {priceError && (
                <motion.p
                  variants={fadeIn}
                  initial='hidden'
                  animate='show'
                  exit={{ opacity: 0, y: 10 }}>
                  Price should be a positive number!
                </motion.p>
              )}
            </div>
            {/* EOF Price field */}
            {/* Quantity field */}
            <div className='col-6'>
              <label htmlFor='quantity' class='form-label mt-5'>
                Quantity{' '}
                {!quantity ? null : watchQuantity ? (
                  <AiOutlineIssuesClose size={20} color='red' />
                ) : (
                  <IoMdCheckmarkCircleOutline size={20} color='green' />
                )}
              </label>
              <input
                name='quantity'
                id='quantity'
                class='form-control'
                onBlur={() => setErrorIcons({ ...errorIcons, quantity: true })}
                type='number'
                style={{
                  backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
                }}
                ref={register({ pattern: /^[0-9]+$/gi })}
              />
              {errors.quantity && 'Please specify the quantity.'}
            </div>
            {/* EOF Quantity field */}
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
            {/* Sold field */}
            <div className='col-6'>
              <label htmlFor='sold' class='form-label mt-5'>
                Sold{' '}
                {!sold ? null : watchSold ? (
                  <AiOutlineIssuesClose size={20} color='red' />
                ) : (
                  <IoMdCheckmarkCircleOutline size={20} color='green' />
                )}
              </label>
              <input
                name='sold'
                id='sold'
                class='form-control'
                onBlur={() => setErrorIcons({ ...errorIcons, sold: true })}
                type='number'
                style={{
                  backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
                }}
                ref={register({ pattern: /^[0-9]+$/gi })}
              />
              {errors.sold && 'Please provide the amount sold.'}
            </div>
            {/* EOF Sold field */}
            {/* Brand field */}
            <div className='col-md-6 mt-4'>
              <label htmlFor='brand' class='form-label mt-3'>
                Product Brand{' '}
                {!brand ? null : watchBrand ? (
                  <AiOutlineIssuesClose size={20} color='red' />
                ) : (
                  <IoMdCheckmarkCircleOutline size={20} color='green' />
                )}
              </label>
              <input
                class='form-control'
                name='brand'
                onBlur={() => setErrorIcons({ ...errorIcons, brand: true })}
                style={{
                  backgroundColor: darkMode ? 'whitesmoke' : 'lightgrey',
                }}
                id='brand'
                ref={register({ required: true, minLength: 3, maxLength: 40 })}
              />
              {errors.brand && 'Product brand is required. (min: 3, max: 40)'}
            </div>
            {/* EOF Brand field */}

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
            <div className='col-12 mt-4'>
              <FilesUploader
                setImages={setImages}
                images={images}
                uploadImages={cloudinaryResizeUpload}
              />
            </div>
            {/* EOF Image field */}
            <Button
              onClick={handleSubmit(onSubmit)}
              type='primary'
              loading={loading}
              className='my-5 ml-3'>
              Create
            </Button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

const CreateCategoryFormMemo = React.memo(CreateCategoryForm);
export default CreateCategoryFormMemo;
