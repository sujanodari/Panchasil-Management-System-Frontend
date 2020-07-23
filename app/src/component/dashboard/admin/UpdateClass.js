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

class UpdateClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classId: this.props.match.params.id,
      status: false,
      classes: "",
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
        `http://localhost:3012/api/v1/class/${this.state.classId}`,
        this.state.config
      )
      .then((res) => {
        this.setState({
          classes: res.data,
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
        `http://localhost:3012/api/v1/class/${this.state.classId}`,
        this.state.classes,
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
      classes: { ...this.state.classes, [e.target.name]: e.target.value },
    });
  };

  render() {
    if (this.state.status === true) {
      return <Redirect to="/class/view" />;
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
                      <h1>Edit Class</h1>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail1">
                          <Form.Label>Select Class</Form.Label>
                          <Form.Control
                            as="select"
                            name="class"
                            size="lg"
                            value={this.state.classes.class}
                            onChange={this.handleAll}
                          >
                            <option>Choose Class</option>
                            <option>PG</option>
                            <option>Nursery</option>
                            <option>KG</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail2">
                          <Form.Label>Select Section</Form.Label>
                          <Form.Control
                            as="select"
                            name="section"
                            size="lg"
                            value={this.state.classes.section}
                            onChange={this.handleAll}
                          >
                            <option>Choose Section</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail3">
                          <Form.Label>Tuition Fee</Form.Label>
                          <Form.Control
                            type="text"
                            name="tuition"
                            size="lg"
                            value={this.state.classes.tuition}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail4">
                          <Form.Label>ECA Fee</Form.Label>
                          <Form.Control
                            type="text"
                            name="eca"
                            size="lg"
                            value={this.state.classes.eca}
                            onChange={this.handleAll}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail5">
                          <Form.Label>Transportation Fee</Form.Label>
                          <Form.Control
                            type="text"
                            name="trans"
                            size="lg"
                            value={this.state.classes.trans}
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

export default UpdateClass;
