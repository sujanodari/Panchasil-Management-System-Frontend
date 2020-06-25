import React, {Component} from 'react'; 
import '../../App.css';
import Navbar from 'react-bootstrap/Navbar';
class RegistrationNav extends Component{


render(){

return(
        <><div className="container">
        <Navbar  className="school" bg="light dark">
        <Navbar.Brand href="/register"><label class="school">Panchashil School</label></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            <label className="register" >Already Member, To Login:</label> <a className="school" href="/">Click Here</a>
        </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
    </div>
    </>
    
)}
    

}
export default RegistrationNav;