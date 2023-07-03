import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../api';
import { setAllProducts } from '../../context/actions/productActions';

const DBHome = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProductsList = async () => {
      if(!products){
        const productsList = await getAllProducts();
        productsList.json().then((products) => {
          dispatch(setAllProducts(products.data));
        });
      }
    }
    getProductsList();
  }, [dispatch, products]);
  return (
    <div>DBHome</div>
  )
}

export default DBHome