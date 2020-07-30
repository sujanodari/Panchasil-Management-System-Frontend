import React, { Component } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import "../../../App.css";
import Nav from "../../NavBar/AdminNav";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
class character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      users: {},
      name: "",
      parentName: "",
      address: "",
      wardNo: "",
      dateFrom: "",
      dateTo: "",
      heldYear: "",
      grade: "",
      seeReg: "",
      seeSymbol: "",
      dob: "",
      status: false,
      config: {
        headers: {
          Authorization: ` ${localStorage.getItem("myToken")}`,
        },
      },
    };
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

    componentDidMount() {
      axios.get(`http://localhost:3012/api/v1/users/${this.state.userId}`, this.state.config,)
          .then(res => {
              this.setState({
                  users: res.data
              });
          })

          .catch(e => {
              console.log(e);
          });
  }
  
    characterPdf = (e) => {
      axios
      .post("http://localhost:3012/api/v1/character", this.state,this.state.config)
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            status: true,
   
            
          });
        }
      })

      .then((response) => 
      axios.post(
          "http://localhost:3012/api/v1/createCharacter",
          this.state,
          this.state.config
        ))

        .then(() =>
        axios.get("http://localhost:3012/api/v1/fetchCharacter", {
          responseType: "blob",
        })
      )

      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "character.pdf");
      });

    }

  render() {
    if (this.state.status === true) {
      return <Redirect to="/report/viewStudentsDetails" />;
    }
    return (
      <div>
        <Nav />
        <div>
          <div className="container fixed">
            <div className="row">
              <div className="col-md-12">
                <Container>
                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="name"
                      disabled
                      value={this.state.name=this.state.users.fullName}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Parent Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Parent Name"
                      name="parentName"
                      disabled
                      value={this.state.parentName=this.state.users.parentName}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      disabled
                      value={this.state.address=this.state.users.address}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Date of Birth"
                      name="dob"
                      disabled
                      value={this.state.dob=this.state.users.date}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Ward No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ward No. with District"
                      name="wardNo"                     
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Year From</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enroll Year"
                      name="dateFrom"
                      
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Year To</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pass out Year"
                      name="dateTo"
                    
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Exam Held Year</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Exam Held Year"
                      name="heldYear"
                     
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Grade"
                      name="grade"
                     
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>SEE Registration No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="SEE Registration No."
                      name="seeReg"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>SEE Symbol No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="SEE Symbol No."
                      name="seeSymbol"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  

                  <Button
                    className="button btn-info btn-block"
                    variant="primary"
                    type="submit"
                    onClick={this.characterPdf}
                  >
                    Download Character
                  </Button>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default character;
