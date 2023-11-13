import React from 'react'
import './Item.css'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const Item = (props) => {
  const history = useNavigate();
  async function getProduct(productID) {
    console.log("tgb")
    try {
      const response = await axios.get('http://localhost:8000/product/' + productID )
      .then(products => console.log(products.data))
      console.log(response);
      history(`/product/ ${productID}`, {state: {product: props}})

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='Item'>
      <img onClick={() => getProduct(props.id)} src={props.image} alt="" />
        <p>{props.name} </p>
        <div className="item-prices">
            <div className="item-price-new">
                {props.price }
            </div>
          
        </div>
    </div>
  )
}

export default Item