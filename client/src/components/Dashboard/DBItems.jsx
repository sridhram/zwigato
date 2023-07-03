import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../api';
import { setAllProducts } from '../../context/actions/productActions';

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
    <aside>
      {products.map((products, index) => {
          return(
            <section key={index}>
              <span>{products.productName}</span>
              <span>{products.productPrice}</span>
              <img src={products.productImgs[0]} alt="product image" />
              <span>{products.productCategory.toString()}</span>
            </section>
          );
      })}
    </aside>
  )
}

export default DBItems