import React, { Component } from "react";
import StaffNav from "../../NavBar/StaffNav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import bsCustomFileInput from "bs-custom-file-input";
import Validation from "react-form-input-validation";
import axios from "axios";
import { Redirect } from "react-router-dom";
class AddQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      class: "",
      section: "",
      Exam_type: "",
      ExamDate: "",
      user_Id:"",
      Verror: false,
      file: null,
      questionBank: null,
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
      Exam_type: "required",
      ExamDate: "required",
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
        console.log(response.data);
        this.setState({
          allClasses: response.data,
        });
      });
    });
  }

  questionAdd = (e) => {
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
    } else if (this.state.Exam_type === "") {
      this.setState({
        Verror: true,
      });
    } else if (this.state.ExamDate === "") {
      this.setState({
        Verror: true,
      });
    } else {
      e.preventDefault();
      axios
        .post(
          `http://localhost:3012/api/v1/question/${this.state.user_Id}`,
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
    // alert(e.preventDefault);
    const formdata = new FormData();
    formdata.append("myImage", this.state.file);
    axios
      .post("http://localhost:3012/api/v1/imageUpload", formdata)
      .then((response) => {
        this.setState({
          file: null,
          questionBank: response.data.fileName,
          imageSuccess: true,
          Verror: false,
        });
      })
      .catch((err) => console.log(err.response));
  };

  render() {
    if (this.state.success === true) {
      return (
        <Redirect
          to={{
            pathname: "/staff/retrieveQuestion",
            state: "Assignment added",
          }}
        />
      );
    }

    return (
      <>
        <StaffNav />
        <div className="container fixed">
          <h5 align="center">Add Question</h5>
          <Form>
            {this.state.success === true ? (
              <label className="labelColor" name="errEmail">
                Question Added successfully
              </label>
            ) : null}

            {this.state.imageSuccess === true ? (
              <label className="labelColor" name="errEmail">
                Question file uploaded
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
                {this.state.allClasses.map((allClass) => (
                  <option>{allClass.section}</option>
                ))}
              
              </Form.Control>
              {this.state.errors.section ? (
                <label className="labelColor" name="errEmail">
                  {this.state.errors.section}
                </label>
              ) : null}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
              as="select"
                name="Exam_type"
                value={this.state.Exam_type}
                onChange={this.handleChange}
                onBlur={this.form.handleBlurEvent}
                type="text"
                placeholder="Enter Exam_type">

                    <option>Choose UserType</option>
                    <option>unitTest1</option>
                    <option>unitTest2</option>
                    <option>unitTest3</option>
                    <option>unitTest4</option>
                    <option>terminalExam1</option>
                    <option>terminalExam2</option>
                    <option>terminalExam3</option>
                    <option>terminalExam4</option>
              </Form.Control>
                
              {this.state.errors.Exam_type ? (
                <label className="labelColor" name="errEmail">
                  {this.state.errors.Exam_type}
                </label>
              ) : null}
            </Form.Group>

            <Form.Group controlId="ExamDate">
              <p>
                <b>Question Uploaded Date</b>
              </p>
              <Form.Control
                type="date"
                placeholder="Enter  Date"
                name="ExamDate"
                value={this.state.ExamDate}
                onChange={this.handleChange}
                onBlur={this.form.handleBlurEvent}
              />
              {this.state.errors.ExamDate ? (
                <label className="labelColor" name="ExamDate">
                  {this.state.errors.ExamDate}
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
                  Choose question file
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
              onClick={this.questionAdd}
              type="submit"
              className="btn-block"
            >
              Add Question
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default AddQuestion;
