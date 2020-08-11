import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Nav from '../../NavBar/StaffNav'
class ViewMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      addMarks: [],
     
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
      .get("http://localhost:3012/api/v1/ExamMarks", this.state.config)
      .then((response) => {
        this.setState({
          addMarks: response.data,
        });
      });
  }

  render() {
    if (this.state.status === true) {
      return <Redirect to="/staff/view/marks" />;
    } else {
      const { error, addMarks } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else {
        return (
          <div>
            <Nav />
            <div className="container table-fixed">
              <Table
                responsive
                striped
                bordered
                hover
                size="sm"
                variant="dark"
                className="admin"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Year</th>
                    <th>Exam Type</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Update Score</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {addMarks.map((addMarks, index) => (
                    <tr key={addMarks.marksId}>
                      <td>{addMarks.marksId}</td>
                      <td>{addMarks.studentName}</td>
                      <td>{addMarks.email}</td>
                      <td>{addMarks.class}</td>
                      <td>{addMarks.section}</td>
                      <td>{addMarks.year}</td>
                      <td>{addMarks.examType}</td>
                      <td>{addMarks.subject}</td>
                      <td>{addMarks.marks}</td>
                      <td>
                         <a
                      href={`updateMarks/${addMarks.marksId}`}
                      className="btn btn-primary"
                    >
                      {" "}
                      Update Score{" "}
                    </a>

                    
                    </td>
                      
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        );
      }
    }
  }
}
export default ViewMarks;
