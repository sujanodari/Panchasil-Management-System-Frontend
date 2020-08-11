import React, { Component } from "react";
import "../../App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "./logo.png";
// import NavDropdown from 'react-bootstrap/NavDropdown'
class StudentNav extends Component {
  handleLogout() {
    localStorage.removeItem("type");
    localStorage.removeItem("myToken");
    window.location.reload();
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <Navbar bg="light dark" fixed="top">
            <Navbar.Brand href="/staff">
              <img src={Logo} alt="logo" align="center" className="img-fluid" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto"></Nav>
              <Nav>
                <Nav.Link href="/student/viewAssignment">
                  <i className="fa fa-book" aria-hidden="true"></i>{" "}
                  <label className="admin">View Assignment</label>{" "}
                </Nav.Link>
                <Nav.Link href="/student/viewActivities">
                  <i className="fa fa-book" aria-hidden="true"></i>{" "}
                  <label className="admin">View Activities</label>{" "}
                </Nav.Link>
                <Nav.Link href="/student/profile">
                  <i className="fa fa-user" aria-hidden="true"></i>{" "}
                  <label className="admin">Profile</label>{" "}
                </Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleLogout}
                  >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>Logout
                  </button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </>
    );
  }
}
export default StudentNav;
