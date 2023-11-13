import React, { useContext, useState, useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import axios from 'axios'
const ShopCategory = (props) => {
  async function getProducts() {
    const cat = props.category
    try {
      const response = await axios.get('http://localhost:8000/prod/' +  cat)
      .then(products => getProd(products.data))
    } catch (error) {
      console.error(error);
    }
    console.log(products)

  }

  const [products, getProd] = useState([])
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className='shop-category'>
    <img className='shopcategory-banner' src={props.banner} alt="" />
    <div className="shopcategory-indexSort">
      <p>
        <span>Showing 1-12 {props.category}</span> {products.length}
      </p>
      <div className="shopcategory-sort">
        Sort by <img src={dropdown_icon} alt="" />
      </div>
    </div>
    <div className="shopcategory-products">
      {products.map((item,i)=>{
        if (props.category===item.category) {
          return <Item key={i} name={item.name} image={item.image} price={item.price} id={item._id} category={item.category} />
        }
        else{
          return null;
        }
      })}
    </div>

  </div>
  )
}

export default ShopCategory
