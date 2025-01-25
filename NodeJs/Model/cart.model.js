import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbNail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    quantity: {
        type: Number,
        min: 0
    }
})


const cartModel = mongoose.model("cartItem", cartSchema);

export default cartModel;