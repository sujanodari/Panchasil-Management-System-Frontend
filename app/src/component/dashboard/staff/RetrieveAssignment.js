import React, { Component } from "react";
import StaffNav from "../../NavBar/StaffNav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import axois from "axios";
class RetrieveAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      class: "",
      section: "",
      submissiondate: "",
      title: "",
      image: "",
      allclasses: [],
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
            `http://localhost:3012/api/v1/teacherassignment/${this.state.userId}`,
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
  handleDelete = (id) => {
    axois
      .delete(
        "http://localhost:3012/api/v1/teacherassignment/" + id,
        this.state.config
      )
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  render() {
    // console.log(this.state.allclasses);
    return (
      <>
        <StaffNav />
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
                    <Card.Header>Assignment Details</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <p>
                          <b>Title:</b>
                        </p>
                        <p>{allclasses.title}</p>

                        {allclasses.image != null ? (
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
                        <p>
                          <b>Submission Date: </b>
                        </p>
                        <p>{allclasses.submissiondate}</p>
                        <p>
                          <b>Publish Date: </b>
                        </p>
                        <p>{allclasses.createdAt}</p>
                      </Card.Text>
                    </Card.Body>
                    <Button
                      className="btn btn-danger"
                      type="submit"
                      onClick={() => {
                        if (window.confirm("Are you sure??"))
                          this.handleDelete(allclasses.assignmentId);
                      }}
                      // onClick={() => this.handleDelete(allUsers.userId, index)}
                    >
                      Delete
                    </Button>
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

export default RetrieveAssignment;
