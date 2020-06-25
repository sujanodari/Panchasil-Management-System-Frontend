import React, {Component} from 'react'; 
import '../../App.css';
import Navbar from 'react-bootstrap/Navbar';
class LoginNav extends Component{


render(){

return(
        <><div className="container">
        <Navbar  className="school" bg="light dark">
        <Navbar.Brand href="/"><label className="school" >Panchashil School</label></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            <label className="register" >Not a Member, To Register:</label> <a className="school" href="/register">Click Here</a>
        </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
    </div>
    </>
)}
    

}
export default LoginNav;