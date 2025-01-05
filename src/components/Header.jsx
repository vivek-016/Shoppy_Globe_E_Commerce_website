import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';



function Header() {


    const cartItems = useSelector((store)=>store.cart.items);




    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };



    return(
        <div className="HeaderContainer">

            
            <div className="HeaderTitle">


                
                <Link to="/"><h1>Shoppy Globe</h1></Link>

            </div>



            


            <div className="Navigation">
                <div className="menu">
                    <div className="menubar" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <ul className={isMenuOpen ? "visible" : "hidden"}>
                        <Link to="/"><li onClick={toggleMenu}>Home</li></Link>
                        <Link to="/ProductList"><li onClick={toggleMenu}>Products</li></Link>
                        <Link to="/Cart"><li onClick={toggleMenu}>Cart</li></Link>
                    </ul>
                </div>

                <Link to="/Cart">
                    <div className="cartIcon">
                        <h3>{cartItems.length}</h3>
                        <FontAwesomeIcon icon={faCartShopping} style={{width:"35px", height:"35px", color:"yellowgreen"}}/>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default Header;