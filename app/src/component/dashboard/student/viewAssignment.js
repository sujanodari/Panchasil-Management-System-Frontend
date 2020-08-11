import React, { Component } from "react";
import Nav from "../../NavBar/StudentNav";
import Card from "react-bootstrap/Card";

import axois from "axios";
class ViewAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      class: "",
      section: "",
      Exam_type: "",
      ExamDate: "",
      questionBank: "",
      allclasses: [],
      success: false,
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
  }

  componentDidMount() {
    axois
      .get("http://localhost:3012/api/v1/decode", this.state.config)
      .then((response) => {
        this.setState({
          userId: response.data.userId,
          user: response.data,
        });

        axois
          .get(
            `http://localhost:3012/api/v1/teacherQuestion/${this.state.userId}`,
            this.state.config
          )
          .then((response) => {
            this.setState({
              allclasses: response.data,
            });
          });
      });
  }

  delete(id) {
    axois
      .delete("http://localhost:3012/api/v1/question/" + id, this.state.config)
      .then((response) => {
        this.setState({
          success: true,
        });
        axois
          .get(
            `http://localhost:3012/api/v1/teacherQuestion/${this.state.userId}`,
            this.state.config
          )
          .then((response) => {
            console.log(response.data);
            this.setState({
              allclasses: response.data,
            });
          });
      });
  }

  render() {
    return (
      <>
        <Nav />
        {this.state.allclasses.length === 0 ? (
          <p>No result available</p>
        ) : (
          <div className="container">
            <div className="row">
              {this.state.allclasses.map((allclasses) => (
                <div className="col-md-4">
                  <Card
                    className="fix-news mycard"
                    border="success"
                    style={{ width: "18rem" }}
                  >
                    <Card.Header>Question Details</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <p>
                          <b>Upload Date:</b>
                        </p>
                        <p>{allclasses.ExamDate}</p>
                        <p>
                          <b>Exam Type: </b>
                        </p>
                        <p>{allclasses.Exam_type}</p>
                        <p>
                          <b>Class: </b>
                        </p>
                        <p>{allclasses.class}</p>

                        <p>
                          <b>Section: </b>
                        </p>
                        <p>{allclasses.section}</p>

                        {allclasses.questionBank != null ? (
                          <div>
                            <p>
                              <b>File:</b>
                            </p>
                            <a
                              href={`http://localhost:3012/images/${allclasses.image}`}
                            >
                              <Card.Img
                                variant="top"
                                src={`http://localhost:3012/images/${allclasses.image}`}
                                className="fix-image"
                                alt="Click Here to download"
                              />
                            </a>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
        <br />
      </>
    );
  }
}

export default ViewAssignment;
