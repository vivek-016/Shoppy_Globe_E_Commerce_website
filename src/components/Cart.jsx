import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import './Cart.css';
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";

function Cart() {

    const dispatch = useDispatch();
    const cartItems = useSelector((store)=>store.cart.items);

    const handleClearCart = ()=>{
        dispatch(clearCart());
    }

    if(cartItems.length==0){
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
                    {cartItems.map((Cart)=>(
                        <CartItem key={Cart.id} itemData={Cart}/>
                    ))}
                </div>
                <div className="Btns">
                    <button onClick={handleClearCart}>
                        ClearCart
                    </button>
                </div>
            </div>
        
        </>

    )

};


export default Cart;