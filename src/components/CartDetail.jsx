import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import useFetchProducts from "../utils/useFetchProducts.js";
import './CartDetail.css';


function CartDetail(){

    const params = useParams();
    const {data,loading,error} = useFetchProducts(`http://localhost:3000/api/cart/${params._id}`)
    


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

    return (


        <div className="CartDetailContainer">
        
            <div className="detailsContainer">
                <div className="detailsImg">
                    <img src={data.thumbNail} alt=""  />
                </div>
                <div className="detailsInfo">
                    <h1>Product Name: {data.title}</h1>
                    <div className="description"><h1>Description: </h1><h2>{data.description}</h2></div>
                    <h1>Price: {data.price}</h1>
                    <h1>Rating: {data.rating}</h1>
                </div>
                
            </div>

            
        </div>
    )
}

export default CartDetail;