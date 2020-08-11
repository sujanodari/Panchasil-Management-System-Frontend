import React, { Component } from "react";
import "../../App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "./logo.png";
import Avatar from "react-avatar";
import axois from "axios";
class StudentNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      image: "",
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
      notices: [],
    };
  }

  componentDidMount() {
    //for getting username
    axois
      .get("http://localhost:3012/api/v1/decode", this.state.config)
      .then((response) => {
        this.setState({
          fullname: response.data.fullName,
          image: response.data.image,
        });
      });
  }

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
              <Nav className="center">
                <Nav.Link href="/student/viewAssignment">
                  <i className="fa fa-book" aria-hidden="true"></i>{" "}
                  <label className="admin">View Assignment</label>{" "}
                </Nav.Link>
                <Nav.Link href="/student/viewActivities">
                  <i className="fa fa-book" aria-hidden="true"></i>{" "}
                  <label className="admin">View Activities</label>{" "}
                </Nav.Link>
                <Nav.Link href="/student/profile">
                  <Avatar
                    color={Avatar.getRandomColor("sitebase", [
                      "red",
                      "green",
                      "blue",
                    ])}
                    name={this.state.fullname}
                    size={50}
                    round={true}
                    src={`http://localhost:3012/images/${this.state.image}`}
                  />
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
