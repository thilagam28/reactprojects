import libraicon from '../../asserts/libra-icon.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useDispatch } from 'react-redux';
import Users from '../../services/users';

function Header(){

  const usersInfo = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onLogout=(event)=>{
        event.preventDefault();
        Users.logout(dispatch);
        navigate('/');
  }


    return(<div>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="nav-link" href="#"><img src={libraicon} width={100} height= {60}/> </a>             
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto lt">
                      <li className="nav-item active">
                            <Link className="nav-link" to="/Register">Home</Link>
                      </li>
                      <li className="nav-item active">
                          <Link className="nav-link" to="/About">About Library</Link>
                      </li>
                      <li className="nav-item active">
                          <a className="nav-link" href="#">Rules and Regulations</a>
                      </li>
                      <li className="nav-item active">
                          <a className="nav-link" href="#">Price Card</a>
                      </li>
                </ul>
                {!usersInfo.loginStatus &&
              <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-warning btn-lg logbutton-head" type="submit"><Link to="/">Sign Up</Link></button>
              <button className="btn btn-warning btn-lg logbutton-head" type="submit"><Link to="/Login">Login</Link></button>
            </form>
               }

{usersInfo.loginStatus &&
              <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-warning btn-lg logbutton-head"  onClick={onLogout} type="submit">Logout</button>
            </form>
               }
              </div>
        </nav>
    </div>);
}

export default Header;