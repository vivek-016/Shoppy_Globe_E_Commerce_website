import "./ProductDetail.css"
import { useParams } from "react-router-dom";
import useFetchProducts from "../utils/useFetchProducts";




function ProductDetail() {

    
    const params = useParams();
    
    

    const {data,loading, error} = useFetchProducts(`http://localhost:3000/api/products/${params._id}`)

    if(loading) {
        return(

            <div className="LoadingContainer">
                <h1>Loading<span>....</span></h1>
            </div>

        )
    }


    if(error){
        return <h1>Error: {error}</h1>
    }

    
    

    return(

        <div className="ProductDetailContainer">
        
            <div className="detailsContainer">
                <div className="detailsImg">
                    <img src={data.thumbNail} alt="" />
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

};


export default ProductDetail;