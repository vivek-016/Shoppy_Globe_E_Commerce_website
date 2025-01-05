import './Home.css'
import ProductList from './ProductList';
import { Link } from 'react-router-dom';

function Home() {

    return(


        <div className="HomeContainer">


            
            <div className="Welcome">
                <h1 className='WTitle1'>Welcome to</h1><h1 className='WTitle2'><span>Shoppy Globe</span></h1>
                <Link to="/ProductList"><button>Browse</button></Link>
                <h2 className='WMessage'>Discover the best deals on a wide range of products, from fashion to electronics. Shop with ease and experience global shopping like never before!</h2>

            </div>
            

            
            
        </div>


    )

}

export default Home;