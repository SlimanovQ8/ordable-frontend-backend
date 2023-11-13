import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import './Popular.css'
import axios from 'axios'
const Popular = () => {
  async function getProducts() {
    try {
      const response = await axios.get('http://localhost:8000/getpouplarproducts')
      .then(products => getProd(products.data))
    } catch (error) {
      console.error(error);
    }
  }

  const [products, getProd] = useState([])
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN {products.length}</h1>
      <hr />
      <div className="popular-item">
        {products.map((item,i)=>{
            return <Item key={i} name={item.name} image={item.image} price={item.price} id={item._id} category={item.category} />
        })}
      </div>
    </div>
  )
}

export default Popular
