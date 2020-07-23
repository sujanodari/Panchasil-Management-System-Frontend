import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import axios from "axios";
import "../../../App.css";
import Nav from "../../NavBar/AdminNav";
import { Redirect } from "react-router-dom";

class UpdateNotices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noticeId: this.props.match.params.id,
      status: false,
      notices: "",
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
        `http://localhost:3012/api/v1/notice/${this.state.noticeId}`,
        this.state.config
      )
      .then((res) => {
        this.setState({
          notices: res.data,
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
        `http://localhost:3012/api/v1/notice/${this.state.noticeId}`,
        this.state.notices,
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
      notices: { ...this.state.notices, [e.target.name]: e.target.value },
    });
  };

  render() {
    if (this.state.status === true) {
      return <Redirect to="/notice/view" />;
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
                      <h1>Edit Notice</h1>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail1">
                          <Form.Label>Notice Title</Form.Label>
                          <Form.Control
                            type="text"
                            size="lg"
                            name="title"
                            value={this.state.notices.title}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail2">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                           as="textarea" rows="5"
                           size="lg"
                            name="description"
                            value={this.state.notices.description}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            size="lg"
                            name="name"
                            value={this.state.notices.name}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Button
                          className="button btn-info btn-block"
                          variant="primary"
                          type="submit"
                          size="lg"
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

export default UpdateNotices;
