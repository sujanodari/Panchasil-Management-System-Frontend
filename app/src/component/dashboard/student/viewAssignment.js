import React, { Component } from "react";
import Nav from "../../NavBar/StudentNav";
import Card from "react-bootstrap/Card";

import axois from "axios";
class ViewNotice extends Component {
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
            `http://localhost:3012/api/v1/assignment/${this.state.userId}`,
            this.state.config
          )
          .then((response) => {
            if (response.data.status === 201) {
              // console.log(response.data.result.class + "data");
              this.setState({
                allclasses: response.data,
                class: response.data.result.class,
                section: response.data.result.section,
                submissiondate: response.data.result.submissiondate,
                title: response.data.result.title,
                image: response.data.result.image,
              });
            }
          });
      });
  }

  render() {
    const { allclasses } = this.props;
    return (
      <>
        <Nav />
        {this.state.class !== "" ? (
          <div className="container">
            <div className="col-md-4">
              <div className="container">
                <Card
                  className="fix-news"
                  border="success"
                  style={{ width: "18rem" }}
                >
                  <Card.Header>Assignment Details</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p>
                        <b>Title:</b>
                      </p>
                      <p>{this.state.title}</p>
                      <p>
                        <b>File:</b>
                      </p>

                      <a
                        href={`http://localhost:3012/images/${this.state.image}`}
                      >
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3012/images/${this.state.image}`}
                          className="fix-image"
                          alt="Click Here to download"
                        />
                      </a>
                      <p>
                        <b>Submission Date: </b>
                      </p>
                      <p>{this.state.submissiondate}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </>
    );
  }
}

export default ViewNotice;
