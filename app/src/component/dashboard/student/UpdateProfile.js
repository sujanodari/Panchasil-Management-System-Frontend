import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import axios from "axios";
import "../../../App.css";
import Nav from "../../NavBar/StudentNav";
import { Redirect } from "react-router-dom";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      status: false,
      users: "",
      config: {
        headers: {
          Authorization: ` ${localStorage.getItem("myToken")}`,
        },
      },
      message: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:3012/api/v1/users/${this.state.userId}`,
        this.state.config
      )
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })

      .catch((e) => {
        console.log(e);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const headers = {
      authorization: localStorage.getItem("myToken"),
    };
    axios
      .put(
        `http://localhost:3012/api/v1/users/${this.state.userId}`,
        this.state.users,
        { headers }
      )

      .then((response) => {
        console.log(response.data);
        this.setState({
          status: true,
          message: "News info updated successfully!",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleAll = (e) => {
    this.setState({
      users: { ...this.state.users, [e.target.name]: e.target.value },
    });
  };

  render() {
    if (this.state.status === true) {
      return <Redirect to="/student/profile" />;
    }
    return (
      <div>
        <Nav />
        <div>
          <div className="container fixed">
            <div className="row">
              <div className="col-md-12">
                <Container>
                  <Row>
                    <Col lg={12}>
                      <h1>Edit Profile</h1>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail1">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            size="lg"
                            value={this.state.users.fullName}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail2">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            size="lg"
                            value={this.state.users.address}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail2">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="text"
                            name="date"
                            size="lg"
                            value={this.state.users.date}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail3">
                          <Form.Label>Contact Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="contactNumber"
                            size="lg"
                            value={this.state.users.contactNumber}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail4">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            size="lg"
                            value={this.state.users.email}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formGridState">
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            as="select"
                            name="gender"
                            size="lg"
                            value={this.state.users.gender}
                            onChange={this.handleAll}
                          >
                            <option>Choose Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail5">
                          <Form.Label>Citizenship No.</Form.Label>
                          <Form.Control
                            type="text"
                            name="citizenshipNo"
                            size="lg"
                            value={this.state.users.citizenshipNo}
                            onChange={this.handleAll}
                          />
                        </Form.Group>
                        {this.state.users.userType === "Admin" ? (
                          <Form.Group controlId="formBasicEmail5">
                            <Form.Label>Attendance</Form.Label>
                            <Form.Control
                              type="text"
                              name="attendance"
                              size="lg"
                              value={this.state.users.attendance}
                              onChange={this.handleAll}
                            />
                          </Form.Group>
                        ) : (
                          <Form.Group controlId="formBasicEmail7"></Form.Group>
                        )}

                        <Form.Group controlId="formBasicEmail5">
                          <Form.Label>Parent Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="parentName"
                            size="lg"
                            value={this.state.users.parentName}
                            onChange={this.handleAll}
                            disabled={true}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail6">
                          <Form.Label>Parent Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="parentAddress"
                            size="lg"
                            value={this.state.users.parentAddress}
                            onChange={this.handleAll}
                            disabled={true}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail7">
                          <Form.Label>Parent Contact Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="parentContact"
                            size="lg"
                            value={this.state.users.parentContact}
                            onChange={this.handleAll}
                            disabled={true}
                          />
                        </Form.Group>

                        

                        {this.state.users.userType === "Admin" ? (
                          <Form.Group controlId="formBasicEmail7">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                              type="text"
                              name="amount"
                              size="lg"
                              value={this.state.users.amount}
                              onChange={this.handleAll}
                            />
                          </Form.Group>
                        ) : (
                          <Form.Group controlId="formBasicEmail7"></Form.Group>
                        )}

                        <Form.Group controlId="formGridState">
                          <Form.Label>User Type</Form.Label>
                          <Form.Control
                            as="select"
                            name="userType"
                            size="lg"
                            value={this.state.users.userType}
                            onChange={this.handleAll}
                            disabled={true}
                          >
                            <option>Choose UserType</option>
                            <option>Admin</option>
                            <option>Student</option>
                            <option>Staff</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail5">
                          <Form.Label>Security Answer</Form.Label>
                          <Form.Control
                            type="text"
                            name="securityAnswer"
                            size="lg"
                            value={this.state.users.securityAnswer}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Button
                          className="button btn-info btn-block"
                          variant="primary"
                          type="submit"
                          size="lg"
                        >
                          Save
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
