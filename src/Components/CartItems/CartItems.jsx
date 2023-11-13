import React, { useContext, useEffect, useState } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import all_product from '../Assets/all_product'
import axios from 'axios'
import { UserContext } from '../../Context/user.context'
const CartItems = () => {
  const { user, fetchUser, } = useContext(UserContext);

  
    const [products, getProd] = useState([])
  const [total, setTotal] = useState(0)
  async function getItems()  {

    var fetchedUser = "";

      fetchedUser = await fetchUser();
      console.log(fetchedUser)
     
   
   const userID = fetchedUser.id

      try {
          await axios.get('http://localhost:8000/getCartItems/' + userID )
          .then(products =>
              getProd(products.data.cartItems))


          
        } catch (error) {
          console.error(error);
        }
        getTotal();

  }
  async function getTotal() {
    for (let i = 0; i < products.length; i++) {
      setTotal((total + products[i].price * products[i].quantity))
      console.log(total)
      
     }
  }

  useEffect(() => {
    getItems(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e)=>{
        if(1==1)
        {
            return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>{e.price} KD</p>
                            <button className='cartitems-quantity'>{e.quantity}</button>
                            <p>{e.price * e.quantity} KD</p>
                        </div>
                        <hr />
                    </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>{total} KD</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3> {total} KD</h3>
                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
        </div>
        
      </div>
    </div>
  )
}

export default CartItems
