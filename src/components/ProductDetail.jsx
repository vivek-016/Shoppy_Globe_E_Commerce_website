import "./ProductDetail.css"
import { useParams } from "react-router-dom";
import useFetchProducts from "../utils/useFetchProducts";




function ProductDetail() {

    
    const params = useParams();
    
    

    const {data,loading, error} = useFetchProducts("https://dummyjson.com/products")

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

    const details = data.find(data=>data.id == params.id);

    
    

    return(

        <div className="ProductDetailContainer">
        
            <div className="detailsContainer">
                <div className="detailsImg">
                    <img src={details.thumbnail} alt="" />
                </div>
                <div className="detailsInfo">
                    <h1>Product Name: {details.title}</h1>
                    <div className="description"><h1>Description: </h1><h2>{details.description}</h2></div>
                    <h1>Price: {details.price}</h1>
                    <h1>Rating: {details.rating}</h1>
                    
                </div>
                
            </div>

            
        </div>

    )

};


export default ProductDetail;