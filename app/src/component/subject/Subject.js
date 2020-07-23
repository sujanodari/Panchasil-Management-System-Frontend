import React, { Component } from "react";
import "../../App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Validation from "react-form-input-validation";
import axios from "axios";
import { Link } from "react-router-dom";
class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: [],
      errors: {},
      subId: "",
      Verror: false,
      useform: false,
      success: false,
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
    this.form = new Validation(this);
    this.form.useRules({
      subjectName: "required",
    });
  }
  componentDidMount() {
    axios
      .get("http://localhost:3012/api/v1/subjects", this.state.config)
      .then((response) => {
        this.setState({
          subject: response.data,
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
      .delete("http://localhost:3012/api/v1/subjects/" + id, this.state.config)
      .then((response) => {
        this.setState({
          Verror: false,
          success: true,
          subId: "",
        });
        axios
          .get("http://localhost:3012/api/v1/subjects", this.state.config)
          .then((response) => {
            this.setState({
              subject: response.data,
            });
          });
      });
  }
  render() {
    return (
      <>
        <div className="container">
          <p align="center">
            <b>Subjects</b>
          </p>
          <hr />

          {this.state.subject.length === 0 ? (
            <p>No subjects available</p>
          ) : (
            <div className="row">
              {this.state.subject.map((subjects) => (
                <div className="col-md-4 fix-news">
                  <Card>
                    <Card.Body>
                      <Card.Title>{subjects.subjectName}</Card.Title>
                      <a
                        href={`/addSubject/${subjects.subId}`}
                        className="btn-block"
                      >
                        Add Subjects for class
                      </a>

                      <Link to={`/updateSubject/${subjects.subId}`}>
                        <Button variant="secondary" 
                        type="submit" 
                         className="btn-block">
                          Edit
                        </Button>
                      </Link><br/>

                      <Button
                        variant="success"
                        onClick={() => this.delete(subjects.subId)}
                        type="submit"
                        className="btn-block"
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Subject;
