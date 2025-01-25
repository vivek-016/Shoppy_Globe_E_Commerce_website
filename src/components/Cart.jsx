
import CartItem from "./CartItem";
import './Cart.css';

import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import useFetchProducts from "../utils/useFetchProducts.js";

function Cart() {

    const {data,loading,error} = useFetchProducts("http://localhost:3000/api/cart")


    if (loading) {
        return(

            <div className="LoadingContainer">
                <h1>Loading<span>....</span></h1>
            </div>

        )
    }

    if(error){
        return(

            <div className="errorContainer">
                <div className="errMsg">
                    <h1><span>Error: </span>{error}</h1>
                </div>
            </div>
        )
    } 

    if(data.length==0){
        return(
            <div className="emptyContainer">
                <div className="emptyImg">
                    <img src="/src/assets/6011.jpg" alt="" />
                </div>
                <div className="emptyMsg">
                    <h1>Your Cart is Empty!</h1>
                    <h2>Browse for items</h2>
                    <div className="Btns">
                        <Link to="/ProductList"><button>Browse</button></Link>
                    </div>
                </div>

            </div>
        )
    }

    return(

        <>
        
            <div className="CartListContainer">
                <h1 className="CLCTitle">Products in Cart</h1>
                <div className="ListContainer">
                    {data.map((Cart)=>(
                        <CartItem key={Cart._id} itemData={Cart}/>
                    ))}
                </div>
                
            </div>
        
        </>

    )

};


export default Cart;