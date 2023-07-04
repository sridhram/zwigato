import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProducts } from '../../api';
import { setAllProducts } from '../../context/actions/productActions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { animateClick, animateHover } from '../../animations';
import { motion } from 'framer-motion';
import { alertNull, alertSuccess } from '../../context/actions/alertActions';

const ConfirmDialog = ({ dialogRef, currentProduct, productsList, resetCurrProd }) => {
  const dispatch = useDispatch();
  const deleteProductOnConfirm = async () => {
    dialogRef.current.close();
    const response = await deleteProduct(currentProduct.productId);
    response.json().then(() => {
      dispatch(setAllProducts(
        productsList.filter((product) => {
          return product.productId !== currentProduct.productId
        })
      ));
      dispatch(alertSuccess('Product deleted successfully'));
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
      resetCurrProd(null);
    });
  }
  return(
    <dialog data-modal ref={dialogRef} className='top-[50%] left-[50%] p-4 rounded-lg translate-x-[-50%] translate-y-[-50%]'>
        <p className='my-4'>Are you sure you want to delete the product?</p>
        <div className='flex gap-4 justify-center'>
        <motion.button {...animateClick} className='px-4 py-2 rounded-md border shadow-md hover:border-[#ff6c6c]' onClick={deleteProductOnConfirm}>Yes</motion.button>
        <motion.button {...animateClick} className='px-4 py-2 rounded-md border shadow-md hover:border-[#ff6c6c]' onClick={() => { dialogRef.current.close(); }}>No</motion.button>
        </div>
      </dialog>
  )
}

const DBItems = () => {
  const products = useSelector(state => state.products);
  const dialogRef = useRef();
  const [currProdData, setCurrProdData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProductsList = async () => {
      if (!products) {
        const productsList = await getAllProducts();
        productsList.json().then((products) => {
          dispatch(setAllProducts(products.data));
        });
      }
    }
    getProductsList();
  }, [dispatch, products]);

  const showConfirmDialog = () => {
    setCurrProdData(products[event.target.id]);
    dialogRef.current.showModal();
  }

  return !products ? (<div>Loading...</div>) : (
    <>
      <aside className='flex flex-col gap-4 mt-4'>
        <section className='grid grid-flow-col gap-4 items-center grid-cols-productsListing font-semibold text-xl'>
          <span>Images</span>
          <span>Product Name</span>
          <span>Product Price</span>
          <span>Product Categories</span>
        </section>
        {products.map((products, index) => {
          return (
            <section className='grid group grid-flow-col gap-4 p-2 rounded-md items-center grid-cols-productsListing hover:bg-gray-200' key={index}>
              <img className='w-[100px] h-[100px] rounded-md' src={products.productImgs[0]} alt="product image" />
              <span>{products.productName}</span>
              <span>{products.productPrice}</span>
              <span title={products.productCategory.toString()} className='text-ellipsis overflow-hidden'>{products.productCategory.toString()}</span>
              <div className='gap-2 hidden group-hover:flex'>
                <motion.span {...animateHover}>
                  <PencilIcon id={index} title='Edit' onClick={showConfirmDialog} className='w-5 h-5 cursor-pointer' />
                </motion.span>
                <motion.span {...animateHover}>
                  <TrashIcon id={index} title='Delete' onClick={showConfirmDialog} className='w-5 h-5 cursor-pointer' />
                </motion.span>
              </div>

            </section>
          );
        })}
      </aside>
      <ConfirmDialog dialogRef={dialogRef} currentProduct={currProdData} productsList={products} resetCurrProd={setCurrProdData} />
    </>
  )
}

export default DBItems