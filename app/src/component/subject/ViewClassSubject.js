import React, { Component } from "react";
import AdminNav from "../NavBar/AdminNav";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
class ViewClassSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      section: "",
      status: false,
      subjects: [],
      classes: [],
      subjectsClass: [],
      subclassId: "",
      subId: "",
      classId: "",
      class: "",
      subject: "",
      success: false,
      faliure: false,
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3012/api/v1/subjects", this.state.config)
      .then((response) => {
        this.setState({
          subjects: response.data,
        });
      });

    axios
      .get("http://localhost:3012/api/v1/subjectsClass", this.state.config)
      .then((response) => {
        this.setState({
          subjectsClass: response.data,
        });
      });

    axios
      .get("http://localhost:3012/api/v1/class", this.state.config)
      .then((response) => {
        this.setState({
          classes: response.data,
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  delete(id) {
    axios
      .delete(
        "http://localhost:3012/api/v1/subjectsClass/" + id,
        this.state.config
      )
      .then((response) => {
        this.setState({
          Verror: false,
          success: true,
          subId: "",
        });
        axios
          .get("http://localhost:3012/api/v1/subjectsClass", this.state.config)
          .then((response) => {
            this.setState({
              subjectsClass: response.data,
            });
          });
      });
  }

  render() {
    return (
      <>
        <div>
          <AdminNav />
          <div className="container fixed">
            <h3 align="center">Subject for Class</h3>
            {this.state.success === true ? (
              <label className="labelColor" name="errEmail">
                subject for class is deleted
              </label>
            ) : null}
            {this.state.faliure === true ? (
              <label className="labelColor" name="errEmail">
                Subjet for Class cannot be delete
              </label>
            ) : null}

            {this.state.subjectsClass.length === 0 ? (
              <p align="center" className="labelColor">
                No subjects assigned for class
              </p>
            ) : (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.subjectsClass.map((subjectsClass) => (
                    <tr
                      value={
                        ((this.state.subclassId = subjectsClass.subclassId),
                        (this.state.subId = subjectsClass.subId),
                        (this.state.classId = subjectsClass.classId))
                      }
                    >
                      <td>{subjectsClass.subclassId}</td>
                      {
                        (this.state.classes.map((classes) => {
                          if (classes.classId === this.state.classId) {
                            this.state.class = classes.class;
                            this.state.section = classes.section;
                          }
                        }),
                        this.state.subjects.map((sub) => {
                          if (sub.subId === this.state.subId) {
                            this.state.subject = sub.subjectName;
                          }
                        }))
                      }
                      <td>
                        {" "}
                        {this.state.class} {this.state.section}
                      </td>
                      <td> {this.state.subject}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => this.delete(subjectsClass.subclassId)}
                          type="submit"
                          className="btn-block"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
        <br />
      </>
    );
  }
}

export default ViewClassSubject;
