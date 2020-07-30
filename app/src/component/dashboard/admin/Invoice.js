import React, { Component } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import "../../../App.css";
import Nav from "../../NavBar/AdminNav";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
class pdf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      users: {},
      fullName: "",
      grade: "",
      section: "",
      tuition: 0,
      eca: 0,
      trans: 0,
      examfee: 0,
      lastdue: 0,
      status: false,
      config: {
        headers: {
          Authorization: ` ${localStorage.getItem("myToken")}`,
        },
      },
    };
  }

  handleChange = (e) => {
    this.setState({
       [e.target.name]: e.target.value ,

    });
   
  };



    componentDidMount() {
      axios.get(`http://localhost:3012/api/v1/usersClass/${this.state.userId}`, this.state.config,)
          .then(res => {
              this.setState({
                  users: res.data
              });
          })

          .catch(e => {
              console.log(e);
          });
  }



    feeInvoicePdf = (e) => {
      axios
      .post("http://localhost:3012/api/v1/fees", this.state,this.state.config)
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            status: true,
   
            
          });
        }
      })

      .then((response) => 
      axios.post(
          "http://localhost:3012/api/v1/createInvoice",
          this.state,
          this.state.config
        ))

        .then(() =>
        axios.get("http://localhost:3012/api/v1/fetchInvoice", {
          responseType: "blob",
        })
      )

      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "invoice.pdf");
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
                      name="fullName" disabled
                      value={this.state.fullName=this.state.users.fullName}
                      onChange={this.handleChange}
                      
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="grade" disabled
                      value={this.state.grade=this.state.users.class}
                      onChange={this.handleChange}
                      
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="section" disabled
                      value={this.state.section=this.state.users.section}
                      onChange={this.handleChange}
                      
                    />
                  </Form.Group>

                

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Tuition Fee</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tuition Fee"
                      name="tuition" disabled
                      value={this.state.tuition=this.state.users.tuition}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>ECA Fee</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ECA Fee"
                      name="eca" disabled
                      value={this.state.eca=this.state.users.eca}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Transportation Fee</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Transportation Fee"
                      name="trans"
                      
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Exam Fee</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Exam Fee"
                      name="examfee"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                 

                  <Button
                    className="button btn-info btn-block"
                    variant="primary"
                    type="submit"
                    onClick={this.feeInvoicePdf}
                  >
                    Download Invoice
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

export default pdf;
