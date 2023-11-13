const mongoose=require("mongoose")

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    image: {
        type: String,  
        required: true

    },
    
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
        default: false,
    }
    
    
})
const productCollection = mongoose.model ( "products", product )


    module.exports=productCollection
    