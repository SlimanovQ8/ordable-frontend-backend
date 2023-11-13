const mongoose=require("mongoose")


const orders=new mongoose.Schema( {
    from: {
    type:String,
    required:true
    },
    
 
    status: {
        type:Boolean,
        required:true,
        },
        
     
       
   
    cartItems: []
    })
    const ordersCollection = mongoose.model ( "orders", orders )

    module.exports=ordersCollection
    