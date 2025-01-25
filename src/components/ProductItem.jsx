import './ProductItem.css'
import { Link } from 'react-router-dom';
import { addItem } from '../utils/cartSlice';
import { useEffect } from 'react';


function ProductItem(props) {


    const item = props.itemData;

    const handleAddItem = async () => {
        try {
            // Step 1: Fetch the current cart data
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
    
            // Step 2: Check if the item already exists in the cart
            const existingCartItem = cartData.find(cartItem => cartItem.title === item.title);
    
            if (existingCartItem) {
                // Step 3: If the item exists, increment its quantity
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
                // Step 4: If the item doesn't exist, add it to the cart
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
        <div className="ItemContainer">
            

            <div className="ItemThumbnail">
                <Link to={`./${item._id}`}><img src={item.thumbNail} alt="Item Thunbnail" /></Link>
            </div>
            <div className="Iteminfo">
                <Link to={`./${item._id}`}><h1>{item.title}</h1></Link>
                <p>{item.description}</p>
                <hr />
                <h2>$.{item.price}</h2>
            </div>
            <div className="Btns">
                <button onClick={()=>handleAddItem(item)}>
                    Add to Cart
                </button>
            </div>

        </div>
    )


};

export default ProductItem;