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
        
     
       
   
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: false}]
    })
    const ordersCollection = mongoose.model ( "orders", orders )

    module.exports=ordersCollection
    