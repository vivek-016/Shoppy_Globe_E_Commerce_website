import cartModel from "../Model/cart.model.js";
import mongoose from "mongoose";

// Add Item to Cart
export function addCart(req, res) {
    const { title, thumbNail, description, price, rating, quantity } = req.body;

    const newCartItem = new cartModel({
        title,
        thumbNail,
        description,
        price,
        rating,
        quantity,
    });

    newCartItem
        .save()
        .then((data) => {
            if (!data) {
                return res.status(400).json({ message: "Something went wrong" });
            }
            return res.status(201).json(data);
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

// Fetch All Cart Items
export function fetchCart(req, res) {
    cartModel
        .find()
        .then((data) => {
            if (!data || data.length === 0) {
                return res.status(404).json({ message: "Cart is empty" });
            }
            return res.status(200).json(data);
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

// Fetch Single Cart Item
export function fetchCartItem(req, res) {
    const cartId = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({ message: "Invalid Object Id" });
    }

    cartModel
        .findById(cartId)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Item not found" });
            }
            return res.status(200).json(data);
        })
        .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
}

// Increment Cart Item Quantity
export function incrementCartItem(req, res) {
    const cartId = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({ message: "Invalid cart Id" });
    }

    cartModel
        .findByIdAndUpdate(
            cartId,
            { $inc: { quantity: 1 } },
            { new: true }
        )
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Item not found" });
            }
            return res.status(200).json(data);
        })
        .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
}

// Decrement Cart Item Quantity
export function decrementCartItem(req, res) {
    const cartId = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({ message: "Invalid cart Id" });
    }

    cartModel
        .findByIdAndUpdate(
            cartId,
            { $inc: { quantity: -1 } },
            { new: true }
        )
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Item not found" });
            }
            return res.status(200).json(data);
        })
        .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
}

// Delete Cart Item
export function deleteCartItem(req, res) {
    const cartId = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({ message: "Invalid cart Id" });
    }

    cartModel
        .findByIdAndDelete(cartId)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Item not found" });
            }
            return res.status(200).json({ message: "Item deleted successfully", data });
        })
        .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
}
