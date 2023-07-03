import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../api';
import { setAllProducts } from '../../context/actions/productActions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const DBItems = () => {
  const products = useSelector(state => state.products);
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
  return !products ? (<div>Loading...</div>) : (
    <aside className='flex flex-col gap-4 mt-4'>
      <section className='grid grid-flow-col gap-4 items-center grid-cols-productsListing font-semibold text-xl'>
        <span>Images</span>
        <span>Product Name</span>
        <span>Product Price</span>
        <span>Product Categories</span>
      </section>
      {products.map((products, index) => {
          return(
            <section className='grid grid-flow-col gap-4 items-center grid-cols-productsListing' key={index}>
              <img className='w-[100px] h-[100px] rounded-md' src={products.productImgs[0]} alt="product image" />
              <span>{products.productName}</span>
              <span>{products.productPrice}</span>
              <span>{products.productCategory.toString()}</span>
              <div className='flex gap-2'>
                <PencilIcon className='w-5 h-5' />
                <TrashIcon className='w-5 h-5' />
              </div>
              
            </section>
          );
      })}
    </aside>
  )
}

export default DBItems