import React, { Component } from "react";
import axios from "axios";
import AdminNav from "../../NavBar/AdminNav";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
class StudentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enrolls: [],
      users: [],
      enroll_id: "",
      UserUserId:'',
      ClassClassId:'',
      
      class_name: "",
      section: "",
      student_name: "",
      classes: [],
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3012/api/v1/enroll", this.state.config)
      .then((response) => {
        // this.props.location.state=null
        this.setState({
          enrolls: response.data,
        });
      });
    axios
      .get("http://localhost:3012/api/v1/class", this.state.config)
      .then((response) => {
        // this.props.location.state=null
        this.setState({
          classes: response.data,
        });
      });
    axios
      .get("http://localhost:3012/api/v1/users", this.state.config)
      .then((response) => {
        // this.props.location.state=null
        this.setState({
          users: response.data,
        });
      });
  }

  handleDelete(id) {
    axios
      .delete(`http://localhost:3012/api/v1/enroll/${id}`, this.state.config)
      .then((response) => {
        axios
          .get("http://localhost:3012/api/v1/enroll", this.state.config)
          .then((response) => {
            // this.props.location.state=null
            this.setState({
              enrolls: response.data,
            });
          });
      });
  }

  render() {
    return (
      <>
        <AdminNav />
        {this.state.enrolls.length === 0 ? (
          <p align="center">No enrolls Found</p>
        ) : (
          <div className="container table-fixed">
            <h3 align="center">No of Students Enrolls: {this.state.enrolls.length}</h3>
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
                  <th>User Id</th>
                  <th>FullName</th>
                  <th>ClassName</th>
                  <th>Reports</th>
                 
                </tr>
              </thead>
              <tbody>
                {this.state.enrolls.map((user) => (
                  <tr
                    key={user.enrollId}
                    value={
                      ((this.state.enroll_id = user.enrollId),
                      (this.state.UserUserId = user.UserUserId),
                      (this.state.ClassClassId = user.ClassClassId))
                    }
                  >
                    <td>{this.state.UserUserId}</td>
                    {
                      (this.state.users.map((users) => {
                        if (users.userId === this.state.UserUserId) {
                          this.state.student_name = users.fullName;
                          this.state.email = users.email;
                        }
                      }),
                      this.state.classes.map((classes) => {
                        if (classes.classId === this.state.ClassClassId) {
                          this.state.class_name = classes.class;
                          this.state.section = classes.section;
                        }
                      }))
                    }
                    <td>{this.state.student_name}</td>
                    <td>
                      {this.state.class_name} {this.state.section}
                    </td>
                    <td>

                    <a
                      href={`details/${user.UserUserId}`}
                      className="btn btn-primary"
                    >
                      {" "}
                      Details{" "}
                    </a>

                    <a
                      href={`invoice/${user.UserUserId}`}
                      className="btn btn-secondary"
                    >
                      {" "}
                      Invoice{" "}
                    </a>

                    

                    <a
                      href={`character/${user.UserUserId}`}
                      className="btn btn-info"
                    >
                      {" "}
                      Character{" "}
                    </a>
                    
                    </td>
                    
                   
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </>
    );
  }
}
export default StudentDetails;
