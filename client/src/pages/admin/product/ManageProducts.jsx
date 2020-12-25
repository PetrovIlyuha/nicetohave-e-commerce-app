import { Button, Divider, Image, Input } from 'antd';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavSidebar from '../../../components/navigation/AdminNavSidebar';
import { getProductsByCategoryId } from '../../../redux/product/productSlice';
import { NoSelectedCategory } from '../../../styles/generics';
import { slideInLeft } from '../subcategories/animations';
import SubDropDown from '../subcategories/SubDropDown';
import { isNull, throttle } from '../../../utils/fns';
import ProductCatalogue from './ProductCatalogue';
import { Link } from 'react-router-dom';
import DeleteModal from '../../../components/interaction/DeleteModal';
const { Search } = Input;

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(state => state.theme);
  const { categories } = useSelector(state => state.categories);
  const { productForCategory } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fakeLoading, setFakeLoading] = useState(false);
  const [showedSelectedCategory, setShowedSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState();
  const [revalidateProducts, setRevalidateProducts] = useState(false);

  useEffect(() => {
    const actualCategory = categories.find(c => c.name === selectedCategory);
    if (actualCategory) {
      setShowedSelectedCategory(actualCategory);
      dispatch(getProductsByCategoryId(actualCategory._id));
    }
  }, [selectedCategory, categories]);

  const categoriesNames = categories?.map(cat => cat.name);

  const searchProducts = e => {
    setSearchTerm(e.target.value);
  };

  const throttledSearchProducts = throttle(
    searchProducts,
    1400,
    setFakeLoading,
  );

  const productFilter = product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase());
  const categoryNotSelected = isNull(showedSelectedCategory);
  return (
    <div
      className={darkMode ? 'container-fluid text-white' : 'container-fluid'}
      style={{ backgroundColor: darkMode ? '#432371' : '#F0F3F6' }}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNavSidebar
            fullHeight={
              !selectedCategory ||
              !productForCategory.length ||
              searchTerm.length > 0
            }
          />
        </div>
        <div className='col-md-8 offset-md-1'>
          <div className='container mt-3'>
            <motion.h2
              variants={slideInLeft}
              initial='hidden'
              animate='show'
              className={darkMode ? 'text-white' : ''}>
              Manage All Products
            </motion.h2>
            <Divider
              style={{
                backgroundColor: darkMode ? 'white' : '',
                height: '2px',
              }}
            />
            <SubDropDown
              label='Choose Product Category'
              items={categoriesNames}
              selectItem={setSelectedCategory}
            />
            <div>
              {showedSelectedCategory ? (
                <motion.div className='d-flex flex-column mt-2'>
                  <h5 className={darkMode ? 'text-white' : ''}>
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
                  <h3
                    className={darkMode ? 'text-white' : ''}
                    style={{ textAlign: 'center' }}>
                    No category Selected
                  </h3>
                </NoSelectedCategory>
              )}
            </div>
            <Divider
              style={{
                backgroundColor: darkMode ? 'white' : '',
                height: '2px',
              }}
            />
            {showedSelectedCategory && !!productForCategory.length === true ? (
              <>
                <Search
                  className='mb-4 mt-2'
                  placeholder='product name'
                  allowClear
                  onChange={e => throttledSearchProducts(e)}
                  enterButton='Search'
                  size='large'
                />
                <ProductCatalogue
                  darkState={darkMode}
                  items={productForCategory || []}
                  pathToItem='product'
                  filter={productFilter}
                  loading={fakeLoading}
                  setOpenDeleteModal={setOpenDeleteModal}
                  setItemToDelete={setProductToDelete}
                />
              </>
            ) : (
              <div>
                {categoryNotSelected
                  ? `Please Select the Category to operate products`
                  : `No Product were found in this category.
                    Want to create the products?`}
              </div>
            )}
            {showedSelectedCategory && !!productForCategory.length === false && (
              <Link to={`/admin/products/${showedSelectedCategory?.name}`}>
                <Button type='primary' className='mt-3'>
                  Create Now?
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <DeleteModal
          title='Product'
          onModalClose={() => setOpenDeleteModal(false)}
          onModalOpen={() => setOpenDeleteModal(true)}
          updateItems={setRevalidateProducts}
          item={productToDelete}
        />
      )}
    </div>
  );
};

export default ManageProducts;
