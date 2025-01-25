import productModel from "../Model/products.model.js";
import mongoose from "mongoose";

export function addProducts(req,res){
    const {title, thumbNail, description, price, rating} = req.body;


    const newProduct = new productModel({
        title: title,
        thumbNail: thumbNail,
        description: description,
        price: price,
        rating: rating
    });

    newProduct.save().then((data)=>{
        if(!data){
            res.status(400).send("Something went wrong");
        }
        res.send(data);
    })
}

export function fetchProducts(req, res){
    productModel.find().then(data => {
        if(!data){
            return res.status(400).json({message:"Something went wrong"});
        }
        res.send(data);
    }).catch((err)=>{
        res.status(500).json({message: err.message});
    })
}

export function fetchProduct(req, res){
    const productId = req.params._id;

    // Validate Object Id format
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).send("Invalid Object Id");
    }

    // using findById for ObjectId
    productModel.findById(productId).then((data)=>{
        if(!data){
            return res.status(400).send("Something went wrong");
        }
        res.send(data);
    }).catch(err=> res.status(500).json({message: "Internal Server Error"}));
}