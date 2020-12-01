import React from 'react';
import { Card, Button, Divider } from 'antd';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneCategoryBySlugThunk } from '../../redux/categories/categoriesSlice';

const { Meta } = Card;

const DeleteModal = ({
  onModalClose,
  onModalOpen,
  category,
  updateCategories,
}) => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector(state => state.user);

  const deleteAndUpdateCategories = async () => {
    await dispatch(deleteOneCategoryBySlugThunk(category.slug, token));
    setTimeout(() => onModalClose(), 40);
    updateCategories(true);
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
        cover={<img alt='category visual' src={category.image} />}>
        <Meta title='action' description='Remove The Category?' />
        <Divider orientation='center' style={{ fontSize: 10 }}>
          Confirm or decline
        </Divider>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button type='danger' onClick={deleteAndUpdateCategories}>
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
