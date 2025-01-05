import './CartItem.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../utils/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function CartItem(props) {

    const dispatch = useDispatch();
    const CartItem = props.itemData;

    function handleRemoveItem(CartItem){
        dispatch(removeItem(CartItem));
    }
    function handleAddItem(CartItem){
        dispatch(addItem(CartItem));
    }

    

    return(


        <div className="CartItemContainer">
            

            <div className="CartItemThumbnail">
                <Link to={`./${CartItem.id}`}><img src={CartItem.thumbnail} alt="CartItem Thunbnail" /></Link>
            </div>
            <div className="CartIteminfo">
                <Link to={`./${CartItem.id}`}><h1>{CartItem.title}</h1></Link>
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