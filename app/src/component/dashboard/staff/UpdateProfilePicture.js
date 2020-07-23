import React, { Component } from "react";
import Nav from "../../NavBar/StaffNav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import bsCustomFileInput from "bs-custom-file-input";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NoImage from "./noimage.jpg";

class UpdateProfilePicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      Verror: false,
      file: null,
      image: "",
      success: false,
      imageSuccess: false,
      message: "",
      user: "",
      config: {
        headers: {
          Authorization: ` ${localStorage.getItem("myToken")}`,
        },
      },
    };
  }

  handleFileSelect = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  upload = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("myImage", this.state.file);
    axios
      .post("http://localhost:3012/api/v1/imageUpload", formdata)
      .then((response) => {
        this.setState({
          file: null,
          image: response.data.fileName,
          imageSuccess: true,
          Verror: false,
        });
      })
      .catch((err) => console.log(err.response));
  };

  componentDidMount() {
    bsCustomFileInput.init();
    axios
      .get(
        `http://localhost:3012/api/v1/users/${this.state.userId}`,
        this.state.config
      )
      .then((res) => {
        this.setState({
          user: res.data,
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
      .patch(
        `http://localhost:3012/api/v1/users/${this.state.userId}`,
        this.state,
        { headers }
      )
      .then((response) => {
        this.setState({
          Verror: false,
          routine: null,
          success: true,
          imageSuccess: false,
        });
      });
  };

  render() {
    if (this.state.success === true) {
      return (
        <Redirect
          to={{
            pathname: "/staff/profile",
            state: "Image Added",
          }}
        />
      );
    }
    return (
      <div>
        <Nav />
        <div className="container fixed">
          <h5 align="center">Add Image</h5>
          <Form>
            {this.state.imageSuccess === true ? (
              <label className="labelColor" name="errEmail">
                Image added
              </label>
            ) : null}
            {this.state.Verror === true ? (
              <label className="labelColor" name="errEmail">
                Validation error
              </label>
            ) : null}

            <Form.Group controlId="formBasicEmail3">
              <Form.Label>Image</Form.Label>
              <div className="custom-file">
                <input
                  id="inputGroupFile01"
                  type="file"
                  size="lg"
                  className="custom-file-input"
                  onChange={this.handleFileSelect}
                  name="image"
                />

                <label className="custom-file-label">
                  {this.state.user.image}
                </label>
              </div>
              {this.state.file ? (
                <Button
                  variant="success"
                  type="submit"
                  size="lg"
                  className="btn-block"
                  onClick={this.upload}
                >
                  Upload Image
                </Button>
              ) : null}

              {this.state.user.image == null ? (
                <Card.Img variant="top" src={NoImage} className="fix-image" />
              ) : (
                <a
                  href={`http://localhost:3012/images/${this.state.user.image}`}
                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3012/images/${this.state.user.image}`}
                    className="fix-image"
                    alt="image not found"
                  />
                </a>
              )}
            </Form.Group>
            <Button
              variant="success"
              onClick={this.handleSubmit}
              type="submit"
              className="btn-block"
            >
              Update Profile
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default UpdateProfilePicture;
