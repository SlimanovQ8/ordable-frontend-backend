import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { counter, increment,  } from "../../globalvariables/global"
import { UserContext } from '../../Context/user.context';
import axios from 'axios';

const ProductDisplay = (props) => {

  const { user, fetchUser, } = useContext(UserContext);

  const {getTotalCartItems}= useContext(ShopContext);

    const {product} = props;
    async function addToCart() {
      let name = "Sliman"
      let cartItems = product.id
 

 
      var fetchedUser = "";
  
      if (user) {
        fetchedUser = await fetchUser();
       if (fetchedUser) {
        console.log(fetchedUser)
       }
     }
     const userID = fetchedUser.id
     console.log(userID)
      
        
      
      try{
        
          await axios.post("http://localhost:8000/addtocart/" + product.id, {
              name, userID, 
          })
          .then(res=> {
            console.log("res")
        })
        .catch(e => {
            alert(e)
        })
        increment()
        
      }
      catch(e){
          console.log(e)
      }
      await             getTotalCartItems("6550f46209c10076243ce705")

    }
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
     
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name} </h1>
        <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-new">{product.price} KD</div>
        </div>
        <div className="productdisplay-right-description">
        A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <button onClick={()=>{addToCart()}}>ADD TO CART</button>

       
        <p className='productdisplay-right-category'><span>Category :</span>{product.category}</p>
      </div>
    </div>
  )
}

export default ProductDisplay
