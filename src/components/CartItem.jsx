import './CartItem.css';
import { Link } from 'react-router-dom';
import { addItem, removeItem } from '../utils/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function CartItem(props) {

    const CartItem = props.itemData;

    const handleRemoveItem = async ()=>{

        try{

            //Fetch the current cart data
            const cartResponse = await fetch("http://localhost:3000/api/cart", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });

            if (!cartResponse.ok) {
                throw new Error("Failed to fetch cart data!");
            }
    
            const cartData = await cartResponse.json();

            //Check if the item already exists in the cart
            const existingCartItem = cartData.find(cartItem => cartItem.title === CartItem.title);
            
            if(existingCartItem && existingCartItem.quantity>1){
                //If the item exists and quantity is greater than 1, decrement its quantity
                const decrementResponse = await fetch(`http://localhost:3000/api/cart/${existingCartItem._id}/decrement`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                });

                if (!decrementResponse.ok) {
                    throw new Error("Failed to decrement cart item quantity!");
                }
            }

            else if(existingCartItem && existingCartItem.quantity==1){
                 // Remove the item from the cart
                const deleteResponse = await fetch(`http://localhost:3000/api/cart/${existingCartItem._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                    },
                });

                if (!deleteResponse.ok) {
                    throw new Error("Failed to delete cart item!");
                }
            }


        }
        catch(err){
            console.error(err.message);
        }
        
    }



    const handleAddItem = async () => {
        try {
            //Fetch the current cart data
            const cartResponse = await fetch("http://localhost:3000/api/cart", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
    
            if (!cartResponse.ok) {
                throw new Error("Failed to fetch cart data!");
            }
    
            const cartData = await cartResponse.json();
    
            //Check if the item already exists in the cart
            const existingCartItem = cartData.find(cartItem => cartItem.title === CartItem.title);
    
            if (existingCartItem) {
                //If the item exists, increment its quantity
                const incrementResponse = await fetch(`http://localhost:3000/api/cart/${existingCartItem._id}/increment`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                });
    
                if (!incrementResponse.ok) {
                    throw new Error("Failed to increment cart item quantity!");
                }
    
                console.log("Item quantity incremented successfully!");
            } else {
                //If the item doesn't exist, add it to the cart
                const addResponse = await fetch("http://localhost:3000/api/cart", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: item.title,
                        thumbNail: item.thumbNail,
                        description: item.description,
                        price: item.price,
                        rating: item.rating,
                        quantity: 1,
                    }),
                });
    
                if (!addResponse.ok) {
                    throw new Error("Failed to add to cart!");
                }
    
                console.log("Item added to cart successfully!");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    

    return(


        <div className="CartItemContainer">
            

            <div className="CartItemThumbnail">
                <Link to={`./${CartItem._id}`}><img src={CartItem.thumbNail} alt="CartItem Thunbnail" /></Link>
            </div>
            <div className="CartIteminfo">
                <Link to={`./${CartItem._id}`}><h1>{CartItem.title}</h1></Link>
                <p>{CartItem.description}</p>
                <hr />
                <h2>$.{CartItem.price}</h2><h2>Quantity: {CartItem.quantity}</h2>
            </div>
            <div className="Btns">
                <button onClick={()=>handleRemoveItem(CartItem)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button onClick={()=>handleAddItem(CartItem)}>
                    +1
                </button>
            </div>

        </div>

    )


};

export default CartItem;