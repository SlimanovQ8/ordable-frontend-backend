import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/user.context";
import './CSS/LoginSignup.css' 
import axios  from "axios";
const Login = () => {
 const navigate = useNavigate();
 const location = useLocation();


 const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

 const [form, setForm] = useState({
   email: "",
   password: ""
 });
 
 // This function will be called whenever the user edits the form.
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 // This function will redirect the user to the
 // appropriate page once the authentication is done.
 const redirectNow = async () => {
  const fetchedUser = await fetchUser();
  if (fetchedUser) {
    // Redirecting them once fetched.
    try{

     const email = fetchedUser._profile.data.email
     const _id = fetchedUser.id
     await axios.post("http://localhost:8000/signup", {
         name: "a", _id: _id, email: email
     })
     .then((resp) => console.log(resp))

     navigate("/")
   
 }
 catch(e){
     alert(e)
 }    
  } }
 
 // Once a user logs in to our app, we don’t want to ask them for their
 // credentials again every time the user refreshes or revisits our app, 
 // so we are checking if the user is already logged in and
 // if so we are redirecting the user to the home page.
 // Otherwise we will do nothing and let the user to login.
 const loadUser = async () => {
   if (!user) {
     
   }
 }
 
 // This useEffect will run only once when the component is mounted.
 // Hence this is helping us in verifying whether the user is already logged in

 
 // This function gets fired when the user clicks on the "Login" button.
 const onSubmit = async (event) => {
   try {
     
     const user = await emailPasswordLogin(form.email, form.password);
     if (user) {
       redirectNow();
     }
   } catch (error) {
       if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!");
      } else {
          alert(error);
      }
 
   }
 };
 
 return <form >
  <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <TextField  label="Email"
     type="email"
     variant="outlined"
     name="email"
     value={form.email}
     onChange={onFormInputChange} />
          <TextField 
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={form.password}
          onChange={onFormInputChange}
           />
        </div>
        <Button onClick={onSubmit}>Login</Button>
        <p className="loginsignup-login">Don't have an account? <Link style={{textDecoration: "none"}} to="/register"><span>Register here</span></Link></p>
       
      </div>
    </div>
 
 </form>
}
 
export default Login;