import React, { Component } from "react";
import "../../App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "./logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Avatar from "react-avatar";
import axois from "axios";

class StaffNav extends Component {
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
              <Nav className="mr-auto">
                <Nav.Link href="/staff/attendence">
                  <i className="fa fa-calendar-o" aria-hidden="true"></i>{" "}
                  <label className="admin">Attendence</label>{" "}
                </Nav.Link>
                <NavDropdown
                  className="admin"
                  title="Assignment"
                  id="collasible-nav-dropdown1"
                >
                  <NavDropdown.Item href="/staff/assignment">
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    <label className="admin">Add Assignment</label>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/staff/retrieve">
                    <i className="fa fa-book" aria-hidden="true"></i>{" "}
                    <label className="admin">View Assignment</label>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  className="admin"
                  title="Question"
                  id="collasible-nav-dropdown1"
                >
                  <NavDropdown.Item href="/staff/question">
                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                    <label className="admin">Add Question</label>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/staff/retrieveQuestion">
                    <i className="fa fa-book" aria-hidden="true"></i>{" "}
                    <label className="admin">View Question</label>
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav className="mr-auto">
                  <NavDropdown
                    className="admin"
                    title="Exam"
                    id="collasible-nav-exam"
                  >
                    <NavDropdown.Item href="/staff/add/exam">
                      <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                      <label className="admin">Add Exam</label>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/staff/view/exam">
                      <i className="fa fa-book" aria-hidden="true"></i>{" "}
                      <label className="admin">View Exam</label>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/staff/view/marks">
                      <i className="fa fa-book" aria-hidden="true"></i>{" "}
                      <label className="admin">View Marks</label>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/staff/add/marks">
                      <i className="fa fa-book" aria-hidden="true"></i>{" "}
                      <label className="admin">Add Marks</label>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Nav>

              <Nav className="center">
                <Nav.Link href="/staff/profile">
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
export default StaffNav;
