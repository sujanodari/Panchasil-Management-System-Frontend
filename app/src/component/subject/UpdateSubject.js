import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import axios from "axios";
import "../../App.css";
import Nav from "../NavBar/AdminNav";
import { Redirect } from "react-router-dom";
class UpdateSubject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subId: this.props.match.params.id,
      status: false,
      subject: "",
      config: {
        headers: {
          Authorization: ` ${localStorage.getItem("myToken")}`,
        },
      },
      message: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:3012/api/v1/subjects/${this.state.subId}`,
        this.state.config
      )
      .then((res) => {
        this.setState({
          subject: res.data,
        });
      })

      .catch((e) => {
        console.log(e);
      });
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const headers = {
      authorization: localStorage.getItem("myToken"),
    };
    axios
      .put(
        `http://localhost:3012/api/v1/subjects/${this.state.subId}`,
        this.state.subject,
        { headers }
      )

      .then((response) => {
        console.log(response.data);
        this.setState({
          status: true,
          message: "News info updated successfully!",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };


  handleAll = (e) => {
    this.setState({
      subject: { ...this.state.subject, [e.target.name]: e.target.value },
    });
  };


  render() {
    if (this.state.status === true) {
      return <Redirect to="/subject/view" />;
    }
    return (
      <div>
        <Nav />
        <div>
          <div className="container fixed">
            <div className="row">
              <div className="col-md-12">
                <Container>
                  <Row>
                    <Col lg={12}>
                      <h1>Edit Subject</h1>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail1">
                          <Form.Label>Subject Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="subjectName"
                            size="lg"
                            value={this.state.subject.subjectName}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Button
                          className="button btn-info btn-block"
                          variant="primary"
                          type="submit"
                        >
                          Save
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateSubject;
