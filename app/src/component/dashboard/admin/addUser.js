import React, { Component } from "react";
import "../../../App.css";
import Nav from "../../NavBar/AdminNav";
import Validation from "react-form-input-validation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axois from "axios";
import { saveAs } from "file-saver";
import { Redirect } from "react-router-dom";
class RegistrationPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      users: {},
      errors: {},
      fullName: "",
      address: "",
      date: "",
      contactNumber: "",
      email: "",
      gender: "",
      parentName: "",
      parentAddress: "",
      parentContact: "",
      citizenshipNo: "",
      userType: "",
      password: "",
      securityAnswer: "",
      cPassword: "",
      Verror: false,
      Lstatus: "",
      status: false,
      pmatch: true,

      config: {
        headers: {
          Authorization: ` ${localStorage.getItem("myToken")}`,
        },
      },
    };
   
  }

  handleChange = (e) => {
    this.setState({
      users: { ...this.state.users, [e.target.name]: e.target.value },
    });
  };


    componentDidMount() {
      axois.get(`http://localhost:3012/api/v1/users/${this.state.userId}`, this.state.config,)
          .then(res => {
              this.setState({
                  users: res.data
              });
          })

          .catch(e => {
              console.log(e);
          });
  }

  register = (e) => {
    e.preventDefault();

    const headers = {
      authorization: localStorage.getItem("myToken"),
    };
    axois
      .put(
        `http://localhost:3012/api/v1/users/${this.state.userId}`,
        this.state.users,

        { headers }
        
      )
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            status: true,
   
            
          });
        }
      })
     
        .then((response) => axois.post(
          "http://localhost:3012/api/v1/createAddUser",
          this.state,
          this.state.config
        ))
        .then((response) =>
        axois.get("http://localhost:3012/api/v1/fetchAddUser", {
          responseType: "blob",
        })
      )
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });

        saveAs(pdfBlob, "addUser.pdf");
      });
       
    
  };

  

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
                <Form>
                  {this.state.Verror === true ? (
                    <label className="labelColor">Validation error</label>
                  ) : null}
                  {this.state.Lstatus === "Email already" ? (
                    <label className="labelColor">
                      Email already exist !!!
                    </label>
                  ) : null}
                  <h1 align="center">Generate User Details Report</h1>

                        <Form.Group controlId="formBasicText">
                          <Form.Control
                            type="Text"
                            name="fullName"
                            placeholder="Enter FullName"
                            value={this.state.fullName=this.state.users.fullName}
                            onChange={this.handleChange}
                           disabled
                          />
                         
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                          <Form.Control
                            type="Text"
                            placeholder="Enter Address"
                            name="address"
                            value={this.state.address=this.state.users.address}
                            onChange={this.handleChange}
                           disabled
                          />
                         
                        </Form.Group>
                      
                        <Form.Group controlId="formBasicDate">
                          <Form.Control
                            type="text"
                            placeholder="Enter Date Of Birth"
                            name="date"
                            value={this.state.date=this.state.users.date}
                            onChange={this.handleChange}
                           disabled
                          />
                         
                        </Form.Group>

                        <Form.Group controlId="formBasicNumber">
                          <Form.Control
                            type="Number"
                            placeholder="Enter Contact Numbers"
                            name="contactNumber"
                            value={this.state.contactNumber=this.state.users.contactNumber}
                            onChange={this.handleChange}
                           disabled
                          />
                        
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={this.state.email=this.state.users.email}
                            onChange={this.handleChange}
                           disabled
                          />
                          
                        </Form.Group>
                  
                        <Form.Group controlId="formGridState">
                          <Form.Control
                            as="select"
                            name="gender"
                            disabled
                            value={this.state.gender=this.state.users.gender}
                            onChange={this.handleChange}
                          >
                            <option>Choose Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                          </Form.Control>
                        </Form.Group>
                      
                      
                        <Form.Group controlId="formBasicText">
                          <Form.Control
                            type="Text"
                            placeholder="Enter Parents Name"
                            name="parentName"
                            value={this.state.parentName=this.state.users.parentName}
                            onChange={this.handleChange}
                           disabled
                          />
                          
                        </Form.Group>
                      
                        <Form.Group controlId="formBasicText">
                          <Form.Control
                            type="Text"
                            placeholder="Enter Parents Address"
                            name="parentAddress"
                            value={this.state.parentAddress=this.state.users.parentAddress}
                            onChange={this.handleChange}
                           disabled
                          />
                          
                        </Form.Group>
                     
                 
                        <Form.Group controlId="formBasicNumber">
                          <Form.Control
                            type="Number"
                            placeholder="Enter Parents Contact Numbers"
                            name="parentContact"
                            value={this.state.parentContact=this.state.users.parentContact}
                            onChange={this.handleChange}
                           disabled
                          />
                         
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                          <Form.Control
                            type="Text"
                            placeholder="Enter Citizenship Number"
                            name="citizenshipNo"
                            disabled
                            value={this.state.citizenshipNo=this.state.users.citizenshipNo}
                            onChange={this.handleChange}
                           
                          />
                         
                        </Form.Group>

                        <Form.Group controlId="formGridState">
                          <Form.Control
                            as="select"
                            name="userType"
                            disabled
                            value={this.state.userType=this.state.users.userType}
                            onChange={this.handleChange}
                            
                          >
                            <option>Choose UserType</option>
                            <option>Student</option>
                            <option>Staff</option>
                          </Form.Control>
                        </Form.Group>
                      
                       

                        <Form.Group controlId="formBasicText">
                          <Form.Control
                            type="text"
                            placeholder="What is your pet name?"
                            name="securityAnswer"
                            disabled
                            value={this.state.securityAnswer=this.state.users.securityAnswer}
                            onChange={this.handleChange}
                           
                          />
                         
                        </Form.Group>
                
                          <Button
                            name="register"
                            className="button btn-primary btn-block"
                            variant="primary"
                            type="submit"
                            onClick={this.register}
                          >
                            Download User Details
                          </Button>
                        
                  
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RegistrationPDF;
