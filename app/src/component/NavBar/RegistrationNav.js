import React, { Component } from "react";
import "../../App.css";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./logo.png";
class RegistrationNav extends Component {
  render() {
    return (
      <>
        <div className="container-fluid">
          <Navbar className="school" bg="light dark" fixed="top">
            <Navbar.Brand href="/register">
              <img src={Logo} alt="logo" align="center" className="img-fluid" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <label className="register">Already Member, To Login:</label>{" "}
                <a className="school" href="/">
                  Click Here
                </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}
export default RegistrationNav;
