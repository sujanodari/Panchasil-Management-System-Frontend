import React, { Component } from "react";
import StaffNav from "../../NavBar/StaffNav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import bsCustomFileInput from "bs-custom-file-input";
import Validation from "react-form-input-validation";
import axios from "axios";
import { Redirect } from "react-router-dom";
class AddAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      class: "",
      section: "",
      title: "",
      user_Id: "",
      submissiondate: "",
      cnotfound: false,
      already: false,
      Verror: false,
      file: null,
      image: null,
      allClasses: [],
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
      success: false,
      imageSuccess: false,
    };
    this.form = new Validation(this);
    this.form.useRules({
      class: "required",
      section: "required",
      title: "required",
      submissiondate: "required",
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //for file select
  handleFileSelect = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  componentDidMount() {
    bsCustomFileInput.init();
    axios
      .get("http://localhost:3012/api/v1/decode", this.state.config)
      .then((response) => {
        this.setState({
          user_Id: response.data.userId,
          user: response.data,
        });
        axios
          .get(`http://localhost:3012/api/v1/class`, this.state.config)
          .then((response) => {
            this.setState({
              allClasses: response.data,
            });
          });
      });
  }

  assignmentAdd = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state));
    if (this.state.class === "") {
      this.setState({
        Verror: true,
      });
    } else if (this.state.section === "") {
      this.setState({
        Verror: true,
      });
    } else if (this.state.title === "") {
      this.setState({
        Verror: true,
      });
    } else if (this.state.submissiondate === "") {
      this.setState({
        Verror: true,
      });
    } else {
      e.preventDefault();
      axios
        .post(
          `http://localhost:3012/api/v1/assignment/${this.state.user_Id}`,
          this.state,
          this.state.config
        )
        .then((response) => {
          if (response.data.status === 201) {
            this.setState({
              success: true,
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            this.setState({
              cnotfound: true,
            });
          } else if (err.response.status === 404) {
            this.setState({
              already: true,
            });
          }
        });
    }
  };

  upload = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("myImage", this.state.file);
    axios
      .post("http://localhost:3012/api/v1/imageUpload", formdata)
      .then((response) => {
        this.setState({
          file: null,
          image: response.data.fileName,
          imageSuccess: true,
          Verror: false,
        });
      })
      .catch((err) => console.log(err.response));
  };
  render() {
    if (this.state.success === true) {
     // console.log(this.state.success)
      return (
        <Redirect
          to={{
            pathname: "/staff/retrieve",
          }}
        />
      );
    }
    // else if (this.state.already === true) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/staff/assignment",
    //         state: "Topic already assigned",
    //       }}
    //     />
    //   );
    // } else if (this.state.cnotfound === true) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/staff/assignment",
    //         state: "Class not found",
    //       }}
    //     />
    //   );

    return (
      <>
        <StaffNav />
        <div className="container fixed">
          <h5 align="center">Add assignment</h5>
          {this.state.cnotfound === true ? (
            <h5 align="center" className="labelColor">
              class not found
            </h5>
          ) : null}
          {this.state.already === true ? (
            <h5 align="center" className="labelColor">
              Topic already assigned
            </h5>
          ) : null}
          <Form>
            {/* {this.state.success === true ? (
              <label className="labelColor" name="errEmail">
                Assignment assigned successfully
              </label>
            ) : null} */}

            {this.state.imageSuccess === true ? (
              <label className="labelColor" name="errEmail">
                Assignment file uploaded
              </label>
            ) : null}
            {this.state.Verror === true ? (
              <label className="labelColor" name="errEmail">
                Validation error
              </label>
            ) : null}

            <Form.Group controlId="class">
              <Form.Control
                as="select"
                name="class"
                value={this.state.class}
                onChange={this.handleChange}
              >
                <option>Choose Class</option>
                {this.state.allClasses.map((allClass) => (
                  <option>{allClass.class}</option>
                ))}
              </Form.Control>
              {this.state.errors.class ? (
                <label className="labelColor" name="errEmail">
                  {this.state.errors.class}
                </label>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                name="section"
                value={this.state.section}
                onChange={this.handleChange}
              >
                <option>Choose Section</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </Form.Control>
              {this.state.errors.section ? (
                <label className="labelColor" name="errEmail">
                  {this.state.errors.section}
                </label>
              ) : null}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                onBlur={this.form.handleBlurEvent}
                type="text"
                placeholder="Enter title"
              />
              {this.state.errors.title ? (
                <label className="labelColor" name="errEmail">
                  {this.state.errors.title}
                </label>
              ) : null}
            </Form.Group>

            <Form.Group controlId="submissiondate">
              <p>
                <b>Submission Date</b>
              </p>
              <Form.Control
                type="Date"
                placeholder="Enter submissiondate"
                name="submissiondate"
                value={this.state.submissiondate}
                onChange={this.handleChange}
                onBlur={this.form.handleBlurEvent}
              />
              {this.state.errors.submissiondate ? (
                <label className="labelColor" name="submissiondate">
                  {this.state.errors.submissiondate}
                </label>
              ) : null}
            </Form.Group>

            <Form.Group>
              <div className="custom-file">
                <input
                  id="inputGroupFile01"
                  type="file"
                  className="custom-file-input"
                  onChange={this.handleFileSelect}
                />
                <label className="custom-file-label">
                  Choose assignment file
                </label>
              </div>
              {this.state.file ? (
                <Button
                  variant="success"
                  onClick={this.upload}
                  type="submit"
                  className="btn-block"
                >
                  Upload
                </Button>
              ) : null}
            </Form.Group>

            <Button
              variant="success"
              onClick={this.assignmentAdd}
              type="submit"
              className="btn-block"
            >
              Add Assignment
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default AddAssignment;
