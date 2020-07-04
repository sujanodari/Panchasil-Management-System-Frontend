import React, {Component} from 'react'; 
import '../../App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
class StudentNav extends Component{


render(){

return(
        <><div className="container">
        <Navbar  bg="light dark">
        <Navbar.Brand href="/staff"><label className="school" >Panchashil School</label></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav>
                            <Nav.Link href="/student/profile"><i className="fa fa-user" aria-hidden="true"></i> <label className="admin">Profile</label> </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                            <button className="btn btn-primary" onClick={this.handleLogout}><i  className="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
                            </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
    </Navbar>
    </div>
    </>
)}
    

}
export default StudentNav;