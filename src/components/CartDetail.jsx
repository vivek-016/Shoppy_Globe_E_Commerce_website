import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import './CartDetail.css';


function CartDetail(){

    const params = useParams();
    const cartItems = useSelector((store)=>store.cart.items);
    const Details = cartItems.find(data=>data.id == params.id);

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

    return (


        <div className="CartDetailContainer">
        
            <div className="detailsContainer">
                <div className="detailsImg">
                    <img src={Details.thumbnail} alt=""  />
                </div>
                <div className="detailsInfo">
                    <h1>Product Name: {Details.title}</h1>
                    <div className="description"><h1>Description: </h1><h2>{Details.description}</h2></div>
                    <h1>Price: {Details.price}</h1>
                    <h1>Rating: {Details.rating}</h1>
                </div>
                
            </div>

            
        </div>
    )
}

export default CartDetail;