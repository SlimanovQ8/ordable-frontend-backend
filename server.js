const express = require('express');
const usersCollection = require("./usersdb")
const cors = require('cors');
const productCollection = require('./mongo');
const ordersCollection = require('./orders');
const { ObjectId } = require('mongodb');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://slimanovq8:BawQ8Zaw@cluster0.ydod8vj.mongodb.net/")
.then(()=>{
console.log ("mongodb connected");
})
.catch(()=>{
console.log('failed');
})
var con = mongoose.connection;
var userCollection = con.collection("users")
app.get("/getproducts", cors(), async (req, res) => {

    await productCollection.find({isPopular: true})
    .then(products => (res.json(products)));
})

app.get("/getCartItems/:id", cors(), async (req, res) => {

    let userID = req.params.id;
    await userCollection.findOne({_id: userID})
    .then(products => (res.json(products)));



})
app.get("/getpouplarproducts", cors(), async (req, res) => {

    console.log("fv")

    await productCollection.find({isPopular: true}).limit(4)
    .then(products => (res.json(products)));
})
app.get("/prod/:id", cors(), async (req, res) => {
    let category = req.params.id
    await productCollection.find({category: category})
    .then(products => (res.json(products)));
})
app.get("/product/:id", cors(), async (req, res) => {

    let x = req.params.id;
    console.log(req.params.id)
    await productCollection.findOne({_id: new ObjectId(x)})
    .then(products => (res.json(products)));
})

app.post("/addproduct", async(req, res) => {
  
    const{name, image, price, category, isPopular} = req.body

    console.log("s")
    const data = {
        name: name,
        image: image,
        price: price,
        category: category,
        isPopular: isPopular,
    } 

   

    try{
        var checkIfExist = await productCollection.findOne({name:  name})

        if(!checkIfExist)
        await productCollection.insertMany([data])
    }

    catch(e){
        res.json(e)
        console.log(e)
    }

})

app.post("/login", async(req, res) => {
  
    const{email, password} = req.body

    try{

        const emailExist = await usersCollection.findOne({email: email})

        if(emailExist) {
            res.json("emailexist")
        }

        else {
            res.json("email new")

        }
    }
    catch(e){
        res.json("f")
    }
})

app.post("/signup", async(req, res) => {
  
    const{name, _id, email} = req.body

    const map1 = new Map();



    const data = {
        "name": name,
        "_id": _id,
        "email": email,
        "cartItems": map1,
    } 


    try{

        const emailExist = await usersCollection.findOne({email: email})

        if(emailExist) {
            res.json("email exist")
        }

        else {
            await userCollection.insertMany([data])

        }
    }
    catch(e){
        res.json(e)
        console.log(e)
    }
})


app.post("/addtocart/:id", async(req, res) => {
  
    
    const{name, userID, } = req.body

    
    console.log(req.body)
    console.log(userID)
    let x = req.params.id;
    console.log(req.params.id)
    const product = await productCollection.findOne({_id: new ObjectId(x)})
    console.log(product)

    const data = {
        "name": name,
    } 

    try{


        const currentUser = await userCollection.findOne({_id: userID});
        var getItems = currentUser.cartItems
        var currentItem = getItems[product.name]
        const productName = product.name
        
        var obj = null;    
        var index = 0;
        for (var i = 0; i < getItems.length; i++) {
            if (getItems[i].name == productName) {
                obj = getItems[i];
                index = i;
                break;
            }
        }
        if(obj != null)
        {
            getItems[index].quantity++;
        }
        else {
           var newItem = {
                image: product.image,
                price: product.price,
                name: productName,
                quantity: 1
            }
            getItems.push(newItem)
        }
        console.log(getItems)
        const updateDoc = {
            $set: { 
              cartItems: getItems
          }
        }
            await userCollection.updateOne({_id:userID}, updateDoc)

        
    }
    catch(e){
        res.json(e)
        console.log(e)
        console.log(data)
    }
})

app.post("/placeorder/:id", async(req, res) => {
  
    
    const{name, userID, } = req.body

    
    console.log(req.body)
    console.log(userID)
    let x = req.params.id;
    console.log(req.params.id)
    const product = await productCollection.findOne({_id: new ObjectId(x)})
    console.log(product)

    const data = {
        "name": name,
    } 

    try{


        const currentUser = await userCollection.findOne({_id: userID});
        var getItems = currentUser.cartItems
        var currentItem = getItems[product.name]
        const productName = product.name
        
        var obj = null;    
        var index = 0;
        for (var i = 0; i < getItems.length; i++) {
            if (getItems[i].name == productName) {
                obj = getItems[i];
                index = i;
                break;
            }
        }
        if(obj != null)
        {
            getItems[index].quantity++;
        }
        else {
           var newItem = {
                image: product.image,
                price: product.price,
                name: productName,
                quantity: 1
            }
            getItems.push(newItem)
        }
        console.log(getItems)
        const updateDoc = {
            $set: { 
              cartItems: getItems
          }
        }
            await ordersCollection.insertOne(updateDoc)

        
    }
    catch(e){
        res.json(e)
        console.log(e)
        console.log(data)
    }
})
app.listen(8000, () => {
    console.log("port conne")
})