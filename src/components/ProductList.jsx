import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchProducts from "../utils/useFetchProducts";
import ProductItem from "./ProductItem";
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function ProductList() {


    
    
    const {data,loading,error} = useFetchProducts("http://localhost:3000/api/products");

    
    const [text,setText]=useState('');
    const [filteredItems, setFilteredItems] = useState(data);
    useEffect(() => {
        if (data.length > 0) {
            setFilteredItems(data);
        }
    }, [data]); // Dependency on `data`
    

    function handleSearch(){
        const filteredData = data.filter(item=>item.title.toUpperCase().includes(text.toUpperCase()));
        setFilteredItems(filteredData);
        setText('');
    }

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

    

    return(

        <div className="ProductListContainer">

            <div className="Search">

                <input type="text" name="search" placeholder='Search Products' value={text} onKeyDown={(e)=>{if(e.key==="Enter")handleSearch()}} onChange={(e)=>setText(e.target.value)}/>
                <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>


            <h1 className="PLCTitle">Available Products</h1>
            <div className="ListContainer">
                {filteredItems.map((product)=>(
                    <ProductItem key={product.id} itemData={product}/>
                ))}
            </div>
        </div>
    )
};

export default ProductList;