import React, { useState, useContext, useEffect } from "react"
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom"
import { counter,  } from "../../globalvariables/global"
import { ShopContext } from "../../Context/ShopContext"
import { UserContext, } from "../../Context/user.context"
import { APP_ID } from "../../realm/constants"
const Navbar = () => {
    const { user, fetchUser, logOutUser } = useContext(UserContext);
 
    const {getTotalCartItems}= useContext(ShopContext);

 
    var fetchedUser = "";
    var userID = "";
    const loadUser = async () => {
                 console.log("tg")

      if (!user) {
         fetchedUser = await fetchUser();
        if (fetchedUser) {
         console.log(fetchedUser)
         userID = fetchedUser.id
         setLogged(fetchedUser.id)
        }
        console.log(isLogged + "fgvb")

      }
    }
    
    async function logout() {
        await logOutUser();
    }
    useEffect(() => {
        loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
        getTotalCartItems()
      }, []);
    const [isLogged, setLogged] = useState("")
    const [menu, setMenu] = useState("shop");
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt=""/>
                <p>{getTotalCartItems()}</p>
            </div>
            <ul className="nav-menu">
            <li onClick={() => {setMenu("shop")}}> <Link style={{textDecoration: 'none'}} to='/'>Shop</Link> {menu === "shop" ? <hr/> : <> </>}</li>
            <li onClick={() => {setMenu("mens")}}> <Link style={{textDecoration: 'none'}} to='/mens'>Men</Link> {menu === "mens" ? <hr/> : <> </>}</li>
            <li onClick={() => {setMenu("womens")}}> <Link style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu === "womens" ? <hr/> : <> </>}</li>
            <li onClick={() => {setMenu("kids")}}> <Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> 
             {menu === "kids" ? <hr/> : <> </>} </li>
            </ul>
            <div className="nav-login-cart">
            {isLogged !== ""   ? <button onClick={() => logout()}> Logout</button> : <Link to='/login'><button> Login</button></Link>}
                <Link to='/cart' > <img src={cart_icon} alt=""/> </Link>
                <div className="nav-cart-count"> {getTotalCartItems(isLogged)}</div>
            </div>
        </div>
    )
}
export default Navbar