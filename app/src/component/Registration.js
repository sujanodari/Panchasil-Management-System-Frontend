import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import RegistrationNav from './NavBar/RegistrationNav';
import Validation from "react-form-input-validation";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FacebookLogin from 'react-facebook-login';
import axois from 'axios'

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            errors: {},
            auth: false,
            email: "",
            password: "",
            cPassword: "",
            address: "",
            contactNumber: "",
            date: "",
            citizenshipNo: "",
            parentAddress: "",
            parentContact: "",
            parentName: "",
            gender: "",
            userType: "",
            fullName: "",
            securityAnswer: "",
            Verror: false,
            Lstatus: '',
            status: false,
            pmatch: true

        })
        this.form = new Validation(this);
        this.form.useRules({
            email: "required|email",
            password: "required|min:6",
            cPassword: "required|min:6",
            address: "required|text",
            contactNumber: "required",
            date: "required|date",
            citizenshipNo: "text",
            parentAddress: "required|text",
            parentContact: "required",
            parentName: "required",
            gender: "required",
            userType: "required",
            fullName: "required",
            securityAnswer: "required"
        });
    }

    handleChange = e => {
        this.setState({

            [e.target.name]: e.target.value
        })


    }

    responseFacebook = response => {

        if (response.status !== 'unknown') {
            if (response.gender === 'male') {
                this.setState({ gender: 'Male' })
            }
            if (response.gender === 'female') {
                this.setState({ gender: 'Female' })
            }
            this.setState({
                auth: true,
                fullName: response.name,
                email: response.email,
                date: response.birthday,
                address: response.hometown.name
            })
            alert("Please fill the remaning other values")
        }
        else {
            this.setState({
                auth: false
            })
        }

    }



    register = e => {
        e.preventDefault();

        if (this.state.fullName.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.email.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.address.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.date.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.contactNumber.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.parentName.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.parentAddress.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.parentContact.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.securityAnswer.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else if (this.state.password.length === 0) {
            this.setState({
                Verror: true
            })
        }
        else {
            axois.post('http://localhost:3012/api/v1/users/signup', this.state)
                .then((response) => {
                    if (response.status === 201) {
                        this.setState({
                            status: true, email: '', password: '', cPassword: '', fullName: '', address: '', data: '',
                            citizenshipNo: '', parentAddress: '', parentContact: '', parentName: '', gender: '', userType: '', securityAnswer: ''
                        })
                    }
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        this.setState({
                            Lstatus: 'Email already'
                        })
                    }
                })
        }

    }
    render() {
        if (this.state.status === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <RegistrationNav />

                <div>
                    <div className="container fixed">
                        <div className="row">
                            <div className="col-md-12">
                                <Form>
                                    {
                                        this.state.Verror === true ?
                                            <label className='labelColor'>Validation error</label>
                                            : null
                                    }
                                    {
                                        (this.state.Lstatus === 'Email already') ?
                                            <label className='labelColor'>
                                                Email already exist !!!
                            </label>
                                            : null
                                    }
                                    <h1 align="center">Signup</h1>
                                    <div className=" container">
                                        <div className="row">
                                            <div className="col-md-6">


                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.email ? <label className="labelColor" name="errEmail">{this.state.errors.email}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicText">
                                                    <Form.Control type="Text" name="fullName" placeholder="Enter FullName" value={this.state.fullName} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.fullName ? <label className="labelColor" name="errName">{this.state.errors.fullName}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group controlId="formGridState">
                                                    <Form.Control as="select" name="gender" value={this.state.gender} onChange={this.handleChange}>
                                                        <option>Choose Gender</option>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Others</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicText">
                                                    <Form.Control type="Text" placeholder="Enter Address" name="address" value={this.state.address} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.address ? <label className="labelColor" name="errAddress">{this.state.errors.address}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicDate">
                                                    <Form.Control type="Date" placeholder="Enter Date Of Birth" name="date" value={this.state.date} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.date ? <label className="labelColor" name="errDate">{this.state.errors.date}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicNumber">
                                                    <Form.Control type="Number" placeholder="Enter Contact Numbers" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.contactNumber ? <label className="labelColor" name="errNumber">{this.state.errors.contactNumber}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicText">
                                                    <Form.Control type="Text" placeholder="Enter Parents Name" name="parentName" value={this.state.parentName} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.parentName ? <label className="labelColor" name="errPname">{this.state.errors.parentName}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicText">
                                                    <Form.Control type="Text" placeholder="Enter Parents Address" name="parentAddress" value={this.state.parentAddress} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.parentAddress ? <label className="labelColor" name="errPaddress">{this.state.errors.parentAddress}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicNumber">
                                                    <Form.Control type="Number" placeholder="Enter Parents Contact Numbers" name="parentContact" value={this.state.parentContact} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.parentContact ? <label className="labelColor" name="errPcontact">{this.state.errors.parentContact}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicText">
                                                    <Form.Control type="text" placeholder="What is your pet name?" name="securityAnswer" value={this.state.securityAnswer} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.securityAnswer ? <label className="labelColor " name="errSanswer">{this.state.errors.securityAnswer}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group controlId="formGridState">
                                                    <Form.Control as="select" name="userType" value={this.state.userType} onChange={this.handleChange}>
                                                        <option>Choose UserType</option>
                                                        <option>Student</option>
                                                        <option>Staff</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.password ? <label className="labelColor" name="errPassword">{this.state.errors.password}</label>
                                                        : null}
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group controlId="formBasicText">
                                                    <Form.Control type="Text" placeholder="Enter Citizenship Number" name="citizenshipNo" value={this.state.citizenshipNo} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                                                    {this.state.errors.citizenshipNo ? <label className="labelColor" name="errCitizenno">{this.state.errors.citizenshipNo}</label>
                                                        : null}
                                                </Form.Group>

                                            </div>
                                            <div className="col-md-6">
                                                {
                                                    this.state.errors.email || this.state.errors.fullName || this.state.errors.address
                                                        || this.state.errors.date || this.state.errors.contactNumber || this.state.errors.parentName
                                                        || this.state.errors.parentAddress || this.state.errors.parentContact || this.state.errors.securityAnswer
                                                        || this.state.errors.password || this.state.errors.cPassword ? null :
                                                        <Button name="register" className="button btn-primary btn-block" variant="primary" type="submit" onClick={this.register}>
                                                            Register
                                    </Button>
                                                }
                                            </div>
                                            {this.state.auth ? null :
                                                <Form.Group className="btn-block button" variant="primary" name="facebook">

                                                    <FacebookLogin
                                                        appId="332905457711217"
                                                        fields="email,name,picture,id,birthday,gender,hometown"
                                                        scope="public_profile,email,user_birthday,user_hometown,user_gender"
                                                        callback={this.responseFacebook} />
                                                </Form.Group>

                                            }
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }


}
export default Registration;