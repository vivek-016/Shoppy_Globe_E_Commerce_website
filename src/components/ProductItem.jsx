import './ProductItem.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';


function ProductItem(props) {


    const CartItems = useSelector((store)=>store.cart.items);
    

    const item = props.itemData;


    const dispatch = useDispatch();

    function handleAddItem(item){


        dispatch(addItem(item));
    }

    return(
        <div className="ItemContainer">
            

            <div className="ItemThumbnail">
                <Link to={`./${item.id}`}><img src={item.thumbnail} alt="Item Thunbnail" /></Link>
            </div>
            <div className="Iteminfo">
                <Link to={`./${item.id}`}><h1>{item.title}</h1></Link>
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