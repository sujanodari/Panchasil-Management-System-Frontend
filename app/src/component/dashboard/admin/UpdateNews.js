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

class UpdateNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsId: this.props.match.params.id,
      status: false,
      news: "",
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
        `http://localhost:3012/api/v1/news/${this.state.newsId}`,
        this.state.config
      )
      .then((res) => {
        this.setState({
          news: res.data,
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
        `http://localhost:3012/api/v1/news/${this.state.newsId}`,
        this.state.news,
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
      news: { ...this.state.news, [e.target.name]: e.target.value },
    });
  };

  render() {
    if (this.state.status === true) {
      return <Redirect to="/news/view" />;
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
                      <h1>Edit News</h1>
                      <Form >
                        {this.state.imageSuccess === true ? (
                          <label className="labelColor" name="errEmail">
                            Image added
                          </label>
                        ) : null}
                        <Form.Group controlId="formBasicEmail1">
                          <Form.Label>News Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            size="lg"
                            value={this.state.news.title}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail2">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                           as="textarea" rows="5"
                            name="description"
                            size="lg"
                            value={this.state.news.description}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            size="lg"
                            value={this.state.news.name}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                
                        <Button
                          className="button btn-info btn-block"
                          variant="primary"
                          size="lg"
                          type="submit"
                          onClick={this.handleSubmit}
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

export default UpdateNews;
