import React, { Component } from "react";
import "../../App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "./logo.png";
import Avatar from "react-avatar";
import axois from "axios";
class AdminNav extends Component {
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
          <div className="row">
            <div className="col-md-12">
              <Navbar bg="light dark" fixed="top">
                <Navbar.Brand href="/admin">
                  <img
                    src={Logo}
                    alt="logo"
                    align="center"
                    className="img-fluid"
                  />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <NavDropdown className="admin" title="News" id="newsnav">
                      <NavDropdown.Item href="/news/add">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <label className="admin">Add News</label>{" "}
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/news/view">
                        <i className="fa fa-book" aria-hidden="true"></i>{" "}
                        <label className="admin">View News</label>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      className="admin"
                      title="Notice"
                      id="noticenav"
                    >
                      <NavDropdown.Item href="/notice/add">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <label className="admin">Add Notice</label>{" "}
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/notice/view">
                        <i className="fa fa-book" aria-hidden="true"></i>{" "}
                        <label className="admin">View Notice</label>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown className="admin" title="Class" id="classnav">
                      <NavDropdown.Item href="/class/add">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <label className="admin">Add Class</label>{" "}
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/class/view">
                        <i className="fa fa-book" aria-hidden="true"></i>{" "}
                        <label className="admin">View Class</label>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/show/enroll">
                        <i className="fa fa-book" aria-hidden="true"></i>{" "}
                        <label className="admin">View Enroll</label>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      className="admin"
                      title="Subject"
                      id="collasible-nav-dropdown2"
                    >
                      <NavDropdown.Item href="/subject/add">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <label className="admin">Add Subject</label>{" "}
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/subject/view">
                        <i className="fa fa-book" aria-hidden="true"></i>{" "}
                        <label className="admin">View Subject</label>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/viewSubject">
                        <i className="fa fa-book" aria-hidden="true"></i>{" "}
                        <label className="admin">View Subject For class</label>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      className="admin"
                      title="Activities"
                      id="collasible-nav-dropdown2"
                    >
                      <NavDropdown.Item href="/activities/add">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <label className="admin">Add activites</label>{" "}
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/activities/view">
                        <i className="fa fa-book" aria-hidden="true"></i>{" "}
                        <label className="admin">View activities</label>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      className="admin"
                      title="Report"
                      id="collasible-nav-dropdown2"
                    >
                      <NavDropdown.Item href="/report/viewStudentsDetails">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <label className="admin">Report</label>{" "}
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/report/feeDetails">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <label className="admin">Fee Details</label>{" "}
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Nav className="center">
                    <Nav.Link href="/admin/profile">
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
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        Logout
                      </button>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
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
export default AdminNav;
