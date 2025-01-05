import { Link } from 'react-router-dom';
import './ErrorPage.css';

function Error() {

    return(

        <div className="errContainer">

            <div className="errimg">
                <h1>404</h1>
            </div>

            <div className="errMsg">
                <div className="msg">
                    <h1>
                        OOPS<span>!</span>
                    </h1>
                    <h2>
                        The page you are looking is either not valid or have been removed from the app.
                    </h2>
                </div>
                <button className='errBtn'>
                    <Link to="/"><h1>Home</h1></Link>
                </button>
            </div>
            

        </div>
    )
}
export default Error;