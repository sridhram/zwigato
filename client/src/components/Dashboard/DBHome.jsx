import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../api';
import { setAllProducts } from '../../context/actions/productActions';
import {CChart} from '@coreui/react-chartjs';

const DBHome = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [categoryWiseProductCount, setCategoryWiseProductCount] = useState({});
  useEffect(() => {
    const categorizeProducts = () => {
      if (!products) {
        return;
      }
      const categoryJSON = {};
      products.map((product) => {
        product.productCategory.forEach((category) => {
          if (categoryJSON[category]) {
            categoryJSON[category]++;
          } else {
            categoryJSON[category] = 1;
          }
        });
      });
      setCategoryWiseProductCount(categoryJSON);
    }

    const getProductsList = async () => {
      if(!products){
        const productsList = await getAllProducts();
        productsList.json().then((products) => {
          dispatch(setAllProducts(products.data));
        });
      }
    }
    getProductsList();
    categorizeProducts();
  }, [dispatch, products]);

  return (
    <aside className='flex flex-col gap-4'>
        {
          Object.keys(categoryWiseProductCount).length == 0 ? <div>Loading...</div> 
          :
          <>
            <CChart
              type="bar"
              data={{
                labels: Object.keys(categoryWiseProductCount),
                datasets: [
                  {
                    backgroundColor: '#f87979',
                    data: Object.values(categoryWiseProductCount),
                  },
                ],
              }}
              labels="Catrgories"
            />

            <CChart
              className='w-1/2 h-1/2 self-center'
              type="doughnut"
              data={{
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                  {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    data: [40, 20, 80, 10],
                  },
                ],
              }}
            />
          </>
        }
    </aside>
  )
}

export default DBHome