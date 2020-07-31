import React, { Component } from "react";
import Nav from "../../NavBar/StaffNav";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";

import axois from "axios";
class AddMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      ExamId: this.props.match.params.id,
      enrolls: [],
      user_id: "",
      email: "",
      name: "",
      UserId: "",
      attendence: "",
      err: false,
      notFound: false,
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
  }

  componentDidMount() {
    axois
      .get("http://localhost:3012/api/v1/users", this.state.config)
      .then((response) => {
        const users = [];
        response.data.map((student) => {
          if (student.userType === "Student") {
            users.push(student);
            this.setState({
              users: users,
            });
          }
        });
      });

    axois
      .get("http://localhost:3012/api/v1/decode", this.state.config)
      .then((response) => {
        axois
          .get(
            `http://localhost:3012/api/v1/class/student/${response.data.userId}`,
            this.state.config
          )
          .then((response) => {
            axois
              .get(
                `http://localhost:3012/api/v1/enroll/class/${response.data.result.classId}`,
                this.state.config
              )
              .then((response) => {
                // console.log(response.data)
                this.setState({
                  enrolls: response.data,
                });
              });
          })
          .catch((err) => {
            if (err.response.status === 404) {
              this.setState({
                notFound: true,
              });
            }
          });
      });
  }

  render() {
    return (
      <>
        <Nav />
        <hr />

        <div className="container">
          {this.state.err ? (
            <p align="center">
              <label className="labelColor">use already added in exam</label>
            </p>
          ) : null}
          {this.props.location.state ? (
            <p align="center">
              <label className="labelColor">{this.props.location.state}</label>
            </p>
          ) : null}

          {this.state.notFound === true ? (
            <p align="center">
              <label className="labelColor">class not found</label>
            </p>
          ) : (
            <>
              {" "}
              <h4 align="center">No of Students: {this.state.users.length}</h4>
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
                    <th>UserId</th>
                    <th>FullName</th>
                    <th>Attendance</th>
                    <th>User Type</th>
                    <th>Email</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user) => (
                    <tr
                      key={user.userId}
                      value={(this.state.user_id = user.userId)}
                    >
                      {this.state.enrolls.map((enrolls) => {
                        if (enrolls.UserUserId === this.state.user_id) {
                          this.state.student_name = user.fullName;
                          this.state.email = user.email;
                          this.state.userType = user.userType;
                          this.state.attendance = user.attendance;
                        }
                      })}
                      <td>{this.state.user_id}</td>
                      <td>{this.state.student_name}</td>
                      <td>{this.state.attendance}</td>
                      <td>{this.state.userType}</td>
                      <td> {this.state.email}</td>
                      <td>
                      <a
                      href={`addMarks/${this.state.user_id}`}
                      className="btn btn-secondary"
                    >
                      {" "}
                      Add Marks{" "}
                    </a>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </>
    );
  }
}
export default AddMarks;
