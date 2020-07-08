import React, {Component} from 'react'; 
import '../../App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
class StaffNav extends Component{


render(){

return(
        <><div className="container">
        <Navbar  bg="light dark">
        <Navbar.Brand href="/staff"><label className="school" >Panchashil School</label></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="/staff/attendence"><i className="fa fa-calendar-o" aria-hidden="true"></i> <label className="admin">Attendence</label> </Nav.Link>
                            {/* <NavDropdown className="admin" title="Notice"  id="collasible-nav-dropdown1">
                                <NavDropdown.Item href="notice/view/staff"><i className="fa fa-book" aria-hidden="true"></i>  <label className="admin">View Notice</label></NavDropdown.Item>
                            </NavDropdown> */}
                            </Nav>
                            <Nav>
                            <Nav.Link href="/staff/profile"><i className="fa fa-user" aria-hidden="true"></i> <label className="admin">Profile</label> </Nav.Link>
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
export default StaffNav;