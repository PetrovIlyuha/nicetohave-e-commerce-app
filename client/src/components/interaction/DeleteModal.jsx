import React from 'react';
import { Card, Button, Divider } from 'antd';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneCategoryBySlugThunk } from '../../redux/categories/categoriesSlice';
import { deleteOneSubCategoryBySlug } from '../../redux/subcategories/subCategoriesSlice';
import { deleteProductById } from '../../redux/product/productSlice';

const { Meta } = Card;

const DeleteModal = ({
  onModalClose,
  onModalOpen,
  item,
  updateItems,
  title,
}) => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector(state => state.user);
  const deleteAndUpdateItems = async () => {
    if (title === 'Category') {
      await dispatch(deleteOneCategoryBySlugThunk(item.slug, token));
    } else if (title === 'Subcategory') {
      await dispatch(deleteOneSubCategoryBySlug(item.slug, token));
    } else if (title === 'Product') {
      await dispatch(deleteProductById(item._id, token));
    }
    setTimeout(() => onModalClose(), 40);
    updateItems(true);
  };

  return (
    <Modal
      open={onModalOpen}
      onClose={onModalClose}
      center
      style={{ background: 'rgba(0,0,0,0.1)' }}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt='category visual' src={item.images[0].url} />}>
        <Meta title={item.title} description={`Remove The ${title}?`} />
        <Divider orientation='center' style={{ fontSize: 10 }}>
          Confirm or decline
        </Divider>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button type='danger' onClick={deleteAndUpdateItems}>
            Delete
          </Button>
          <Button type='primary' onClick={onModalClose}>
            Cancel
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default DeleteModal;
