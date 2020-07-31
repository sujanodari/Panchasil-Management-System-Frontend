import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from 'axios';
import "../../../App.css";
import Nav from "../../NavBar/StaffNav";
import { Container } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

class UpdateExamMarks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marksId: this.props.match.params.id,
      addMarks: "",
      success:false,
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
        `http://localhost:3012/api/v1/ExamMarks/${this.state.marksId}`,
        this.state.config
      )
      .then((res) => {
        this.setState({
          addMarks: res.data,
        });
      })

      .catch((e) => {
        console.log(e);
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const headers = {
        'authorization': localStorage.getItem("myToken")
    }
    axios.put(`http://localhost:3012/api/v1/ExamMarks/${this.state.marksId}`,
        this.state.addMarks, { headers }



    )

        .then(response => {
            console.log(response.data);
            this.setState({
                success:true,
                message: "Score updated successfully!"
            });
        })
        .catch(err => {
            console.log(err.response);
        });

};



handleChange = ((e) => {
    this.setState({
        addMarks: { ...this.state.addMarks, [e.target.name]: e.target.value }
    })

})

  render() {
    if (this.state.success=== true) {
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
                      disabled
                      value={
                         this.state.addMarks.studentName
                      }
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="email"
                      disabled
                      value={this.state.addMarks.email}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="class"
                      disabled
                      value={this.state.addMarks.class}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="section"
                      disabled
                      value={this.state.addMarks.section}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      name="year"
                      disabled
                      value={this.state.addMarks.year}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  

                  <Form.Group controlId="formGridState">
                    <Form.Label>Select Exam Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="examType"
                      disabled
                      value={this.state.addMarks.examType}
                      onChange={this.handleChange}
                    >
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
                      disabled
                      value={this.state.addMarks.subject}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Score</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Subject Score"
                      name="marks"
                      value={this.state.addMarks.marks}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Button
                    className="button btn-info btn-block"
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Update Marks
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

export default UpdateExamMarks;
