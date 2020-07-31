import React, { Component } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "../../../App.css";
import Nav from "../../NavBar/StaffNav";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
class AddMark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      users: {},
      subject: "",
      class: "",
      section: "",
      year: "",
      examType: "",
      email: "",
      studentName: "",
      status: false,
      config: {
        headers: {
          Authorization: ` ${localStorage.getItem("myToken")}`,
        },
      },
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:3012/api/v1/usersClass/${this.state.userId}`,
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


  addExamMarks = (e) => {
    axios
    .post("http://localhost:3012/api/v1/ExamMarks", this.state,this.state.config)
    .then((response) => {
      if (response.status === true) {
        this.setState({
          status: true,
 
          
        });
      }
    })
  }

  handleChange = e => {
    this.setState({
    
        [e.target.name]:e.target.value
    })

        
    } 

  render() {
    if (this.state.status=== true) {
        return <Redirect to='/staff/view/marks' />
    }

    return (
      <div>
        <Nav />
        <div>
          <div className="container fixed">
            <div className="row">
              <div className="col-md-12">
                <Container>
                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="studentName"
                      value={this.state.studentName=this.state.users.fullName}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={this.state.email=this.state.users.email}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="class"
                      value={this.state.class=this.state.users.class}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="section"
                      value={this.state.section=this.state.users.section}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      name="year"
                      value={this.state.year=this.state.users.year}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridState">
                    <Form.Label>Select Exam Type</Form.Label>
                    <Form.Control as="select" name="examType"
                    value={this.state.examType}
                    onChange={this.handleChange}>
                      <option>Choose Exam Type</option>
                      <option>unitTest1</option>
                      <option>unitTest2</option>
                      <option>unitTest3</option>
                      <option>unitTest4</option>
                      <option>terminalExam1</option>
                      <option>terminalExam2</option>
                      <option>terminalExam3</option>
                      <option>terminalExam4</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Subject Name"
                      name="subject"
                      value={this.state.subject}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Score</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Subject Score"
                      name="marks"
                      value={this.state.marks}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Button
                    className="button btn-info btn-block"
                    variant="primary"
                    type="submit"
                    onClick={this.addExamMarks}
                  >
                    Add Marks
                  </Button>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMark;
