import React, { Component } from "react";
import Nav from "../../NavBar/StudentNav";
import axois from "axios";
import Card from "react-bootstrap/Card";
import NoImage from "./noimage.jpg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "",
      section: "",
      userId: "",
      user: {},
      fee: {},
      subjectId: [],
      subject: [],
      classId: "",
      routine: "",
      year: "",
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
  }

  componentDidMount() {
    axois
      .get(`http://localhost:3012/api/v1/fee`, this.state.config)
      .then((response) => {
        if (response) {
          this.setState({
            fee: response.data,
          });
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({
            fee: {},
          });
        }
      });

    //getting subject

    axois
      .get(`http://localhost:3012/api/v1/subjects`, this.state.config)
      .then((response) => {
        if (response) {
          this.setState({
            subject: response.data,
          });
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({
            subject: [],
          });
        }
      });
    //for getting user
    axois
      .get("http://localhost:3012/api/v1/decode", this.state.config)
      .then((response) => {
        this.setState({
          userId: response.data.userId,
          user: response.data,
        });

        axois
          .get(
            `http://localhost:3012/api/v1/class/student/${this.state.userId}`,
            this.state.config
          )
          .then((response) => {
            if (response.data.status === 201) {
              this.setState({
                classId: response.data.result.classId,
                section: response.data.result.section,
                class: response.data.result.class,
                year: response.data.year,
                routine: response.data.result.routine,
              });
              axois
                .get(
                  `http://localhost:3012/api/v1/student/subject/${this.state.classId}`,
                  this.state.config
                )
                .then((response) => {
                  if (response) {
                    this.setState({
                      subjectId: response.data,
                    });
                  }
                })
                .catch((err) => {
                  if (err) {
                    this.setState({
                      subjectId: [],
                    });
                  }
                });
            }
          })
          .catch((err) => {
            if (err.response.status === 404) {
              this.setState({
                classId: "",
                section: "Not enrolled yet",
                class: "Not enrolled yet",
                year: "Not enrolled yet",
              });
            }
          });
      });
  }

  render() {
    // console.log(this.state.routine)

    return (
      <>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Card className="text-center mycard fix-news">
                <Card.Header>
                  {this.state.user.image ? (
                    <p>
                      <a
                        href={`http://localhost:3012/images/${this.state.user.image}`}
                      >
                        <Card.Img
                          style={{ height: "30rem" }}
                          variant="top"
                          src={`http://localhost:3012/images/${this.state.user.image}`}
                          className="fix-image"
                          alt="image not found"
                        />
                      </a>
                    </p>
                  ) : (
                    <img
                      src={NoImage}
                      alt="logo"
                      align="center"
                      className="img-fluid size"
                    />
                  )}
                </Card.Header>
                <small>
                  <a
                    href={`studentProfilePictureUpdate/${this.state.user.userId}`}
                  >
                    {" "}
                    Edit Profile Picture{" "}
                  </a>
                </small>
                <Card.Body>
                  <Card.Title>Personal Details: </Card.Title>
                  <hr />
                  <Card.Text>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            Name : <b>{this.state.user.fullName}</b>
                          </p>
                          <p>
                            Address : <b>{this.state.user.address}</b>
                          </p>
                          <p>
                            Name : <b>{this.state.user.fullName}</b>
                          </p>
                          <p>
                            Birthday : <b>{this.state.user.date}</b>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            Contact No : <b>{this.state.user.contactNumber}</b>
                          </p>
                          <p>
                            Email : <b>{this.state.user.email}</b>
                          </p>
                          <p>
                            Gender : <b>{this.state.user.gender}</b>
                            <a
                              href={`/studentProfileUpdate/${this.state.user.userId}`}
                              className="btn-block"
                            >
                              Edit Profile
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Additional Details:
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          Parent Name : <b>{this.state.user.parentName}</b>
                        </p>
                        <p>
                          Parent Contact No :{" "}
                          <b>{this.state.user.parentContact}</b>
                        </p>
                        <p>
                          Attendence : <b>{this.state.user.attendance}</b>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          Registered At : <b>{this.state.user.register}</b>
                        </p>
                        <p>
                          Security Answer :{" "}
                          <b>{this.state.user.securityAnswer}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </div>

            <div className="col-md-4">
              <div className="container">
                <Card
                  className="mycard fix-news"
                  border="success"
                  style={{ width: "18rem" }}
                >
                  <Card.Header>Class Details</Card.Header>
                  <Card.Body>
                    <Card.Title>Class: {this.state.class}</Card.Title>

                    <Card.Text>
                      <p>Section: {this.state.section}</p>
                      <p>Enroll Date: {this.state.year}</p>

                      {this.state.routine ? (
                        <>
                          <p>Routine:</p>
                          <a
                            href={`http://localhost:3012/images/${this.state.routine}`}
                          >
                            <Card.Img
                              variant="top"
                              src={`http://localhost:3012/images/${this.state.routine}`}
                              className="fix-image"
                              alt="image not found"
                            />
                          </a>
                        </>
                      ) : (
                        <p>Routine Not found</p>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card
                  className="mycard fix-news"
                  border="success"
                  style={{ width: "18rem" }}
                >
                  <Card.Header>Fee Details</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {this.state.fee ? (
                        <>
                          <p> Tuition Fee: {this.state.fee.tuition} </p>
                          <p> Extra Curriculum Fee: {this.state.fee.eca} </p>
                          <p> Transportation Fee: {this.state.fee.trans} </p>
                          <p> Exam Fee: {this.state.fee.examfee} </p>
                          <p> Last Due: {this.state.fee.lastdue} </p>
                          <p>
                            {" "}
                            Total:{" "}
                            {this.state.fee.tuition +
                              this.state.fee.eca +
                              this.state.fee.trans +
                              this.state.fee.examfee +
                              this.state.fee.lastdue}{" "}
                          </p>
                        </>
                      ) : (
                        <p>Fee Not found</p>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="container">
                <Card
                  className="fix-news mycard"
                  border="secondary"
                  style={{ width: "18rem" }}
                >
                  <Card.Header>Subject Details</Card.Header>
                  <Card.Body>
                    {this.state.subjectId.map((subjectId) =>
                      this.state.subject.map((subject) => {
                        if (subject.subId === subjectId.subId) {
                          return <Card.Text>{subject.subjectName}</Card.Text>;
                        }
                      })
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <br />
      </>
    );
  }
}

export default Profile;
