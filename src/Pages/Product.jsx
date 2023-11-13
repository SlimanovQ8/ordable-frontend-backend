import React, { useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';


const Product = (props) => {
  const { state } = useLocation();
  const { product } = state;  return (
    <div>
      <ProductDisplay product={product}/>

    </div>
  )
}

export default Product
