const mongoose=require("mongoose")


const users=new mongoose.Schema( {
    name: {
    type:String,
    required:true
    },
    _id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
   
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: false}]
    })
    const usersCollection = mongoose.model ( "users", users )

    module.exports=usersCollection
    