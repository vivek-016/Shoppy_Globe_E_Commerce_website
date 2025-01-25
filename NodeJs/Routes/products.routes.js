import { addCart, fetchCart, fetchCartItem, incrementCartItem, decrementCartItem, deleteCartItem } from "../Controller/cart.controller.js";
import { addProducts, fetchProduct, fetchProducts } from "../Controller/products.controller.js";
import { login, register } from "../Controller/user.controller.js";
import { authenticateJWT } from "../middlewares/authmiddleware";


export function routes(app){
    app.post("/api/products",addProducts);
    app.get("/api/products",fetchProducts);
    app.get("/api/products/:_id",fetchProduct);
    app.post("/api/cart",authenticateJWT ,addCart);
    app.get("/api/cart",authenticateJWT ,fetchCart);
    app.get("/api/cart/:_id",authenticateJWT, fetchCartItem);
    app.put("/api/cart/:_id/increment",authenticateJWT, incrementCartItem);
    app.put("/api/cart/:_id/decrement",authenticateJWT, decrementCartItem);
    app.delete("/api/cart/:_id",authenticateJWT, deleteCartItem );
    app.post("/api/register", register);
    app.post("/api/login", login);
}
