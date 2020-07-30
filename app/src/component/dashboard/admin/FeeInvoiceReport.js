import React, { Component } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import "../../../App.css";
import Nav from "../../NavBar/AdminNav";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
class FeeInvoiceReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feesID: this.props.match.params.id,
      fees: {},
      fullName: "",
      grade: "",
      section: "",
      tuition: 0,
      eca: 0,
      trans: 0,
      examfee: 0,
      lastdue: 0,
      totalInvoice: "",
      feePaid: "",
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
      fees: { ...this.state.fees, [e.target.name]: e.target.value },
    });
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:3012/api/v1/fees/${this.state.feesID}`,
        this.state.config
      )
      .then((res) => {
        this.setState({
          fees: res.data,
        });
      })

      .catch((e) => {
        console.log(e);
      });
  }

  feeInvoice = (e) => {
    e.preventDefault();

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
        )
      )
      .then((response) =>
        axios.get("http://localhost:3012/api/v1/fetchInvoice", {
          responseType: "blob",
        })
      )
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });

        saveAs(pdfBlob, "feeInvoice.pdf");
      });
  };

  render() {
    if (this.state.status === true) {
      return <Redirect to="/report/feeDetails" />;
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
                      name="fullName"
                      disabled
                      value={(this.state.fullName = this.state.fees.fullName)}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="grade"
                      disabled
                      value={(this.state.grade = this.state.fees.grade)}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student Name"
                      name="section"
                      disabled
                      value={(this.state.section = this.state.fees.section)}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Last Due</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Due Fee"
                      name="lastdue"
                      value={(this.state.lastdue = this.state.fees.lastdue)}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Tuition Fee</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tuition Fee"
                      name="tuition"
                      
                      value={(this.state.tuition = this.state.fees.tuition)}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>ECA Fee</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ECA Fee"
                      name="eca"
                      
                      value={(this.state.eca = this.state.fees.eca)}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Transportation Fee</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Transportation Fee"
                      name="trans"
                      
                      value={(this.state.trans = this.state.fees.trans)}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail7">
                    <Form.Label>Exam Fee</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Exam Fee"
                      name="examfee"
                      
                      value={(this.state.examfee = this.state.fees.examfee)}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                 

                 

                  <Button
                    className="button btn-info btn-block"
                    variant="primary"
                    type="submit"
                    onClick={this.feeInvoice}
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

export default FeeInvoiceReport;
