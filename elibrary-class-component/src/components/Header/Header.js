import libraicon from '../../asserts/libra-icon.jpg';
import {Link} from 'react-router-dom';
import { Component } from 'react';

class Header extends Component(){

    render(){
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
                <div>
                <form className="form-inline my-2 my-lg-0">
                <button type="submit" className="btn btn-warning btn-lg logbutton-head" style={{marginLeft:50}}><Link to="/Register">Sign Up</Link></button>
                     
                      <button type="submit" className="btn btn-warning btn-lg logbutton-head"><Link to="/Login">Login</Link></button>
                </form>
                </div>
              </div>
        </nav>
    </div>);
}
}
export default Header;