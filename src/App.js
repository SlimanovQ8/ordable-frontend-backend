import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route,  useLocation, } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Register from './Pages/RegisterPage';
import Login from './Pages/Login';
import DummyPayment from './Pages/PaymentGatewayDummy';
import { UserProvider } from './Context/user.context';
import { useContext, useEffect, useState } from "react";
function App() {
  

  return ( 
    <div>
      <h1> Welcome back  </h1>
    <UserProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element = {<Shop/>}/>
    <Route path='/mens' element = {<ShopCategory category="men"/>}/>
    <Route path='/womens' element = {<ShopCategory category="women"/>}/>
    <Route path='/kids' element = {<ShopCategory category="kid"/>}/>
    <Route path='/product' element = {<Product/>}>
    <Route path=':productId' element = {<Product/>} />
    </Route>
    <Route path='/cart' element = {<Cart/>}/>
    <Route path='/register' element = {<Register/>}/>
    <Route path='/login' element = {<Login/>}/>
    <Route path='/pay' element = {<DummyPayment/>}/>
    </Routes>

    </BrowserRouter>
    </UserProvider>
    </div>
  );
}

export default App;
