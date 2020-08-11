import React, { Component } from "react";
import Nav from "../../NavBar/StaffNav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axois from "axios";

class ViewExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
  }

  componentDidMount() {
    axois
      .get("http://localhost:3012/api/v1/exam", this.state.config)
      .then((response) => {
        this.setState({
          exam: response.data,
        });
      });
  }
  handleDelete(id) {
    axois
      .delete(`http://localhost:3012/api/v1/exam/${id}`, this.state.config)
      .then((response) => {
        axois
          .get("http://localhost:3012/api/v1/exam", this.state.config)
          .then((response) => {
            this.setState({
              exam: response.data,
            });
          });
      });
  }

  render() {
    return (
      <>
        <Nav />
        <div className="container">
          <p align="center">
            <b>No of Exam: {this.state.exam.length} </b>{" "}
          </p>
          <hr />

          <div className="row">
            {this.state.exam.map((exam) => (
              <div className="col-md-4 fix-news">
                <Card border="danger" style={{ width: "18rem" }}>
                  <Card.Header>ExamID: {exam.ExamId} </Card.Header>
                  <Card.Body>
                    <Card.Title>Exam type: {exam.Exam_type}</Card.Title>
                    <Card.Text>
                      <p>Date: {exam.ExamDate} </p>
                      <a
                        href={`/exam/user/${exam.ExamId}`}
                        className="btn btn-primary btn-block"
                      >
                        Add Student in Exam
                      </a>
                      <br />
                      <br />

                      <Button
                        className="btn-danger btn btn-block"
                        onClick={() => {
                          if (window.confirm("Are you sure??"))
                            this.handleDelete(exam.ExamId);
                        }}
                      >
                        Delete Exam
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ViewExam;
