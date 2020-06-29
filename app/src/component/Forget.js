import React, {Component} from 'react'; 
import { Redirect } from 'react-router-dom';
import '../App.css';
import LoginNav from './NavBar/LoginNav';
import Form from 'react-bootstrap/Form';
import Validation from "react-form-input-validation";
import Button from 'react-bootstrap/Button';
import axois from 'axios'
class Forget extends Component{

    constructor(props){
        super(props);
    this.state=({
        errors: {},
        email:"",
        password:"",
        cPassword:"",
        securityAnswer:"",
        Verror:false,
        Lstatus:"",
        status:false
    
    })
    this.form = new Validation(this);
    this.form.useRules({
      email: "required|email",
      password: "required|min:6",
      securityAnswer:   "required"
    });
    }
    
    handleChange = e => {
    this.setState({
    
        [e.target.name]:e.target.value
    })
    } 
    
    forget= (e) => {
        function emailIsValid(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          }
          e.preventDefault();
      
          if (
            this.state.email === 0 ||
            emailIsValid(this.state.email) === false
            
          ) {
            this.setState({
              Verror: true
            });
          }
          else if (
            this.state.password.length === 0 ||
            this.state.password.length < 6
          ) {
            this.setState({
              Verror: true,
            });
          } 
          else if (
            this.state.securityAnswer.length === 0
          ) {
            this.setState({
              Verror: true,
            });
          } 
          else{
            axois.put('http://localhost:3012/api/v1/users/forget', this.state)
            .then((response)=>{
                if(response.data.status===201){
                    this.setState({status:true})
                }    
            })
            .catch(err=>{
                console.log(err.response)
              if(err.response.status===401){
                this.setState({
                    Lstatus:'Not found',
                    Verror:false
                })
                }
                else if(err.response.status===403){
                  this.setState({
                      Lstatus:'answer',
                      Verror:false
                  })
                }
            })
          }
        }
          
render(){
    if (this.state.status === true) {
        return <Redirect to='/' />
    }
return(

       <div> <LoginNav/>
        <div className="container fixed">
        <h1 align="center">Forget Password</h1>
        {
                  (this.state.Lstatus ==='Not found')?
                  <p className='labelColor'>
                  User not found !!!
              </p> 
                      :null
                }  
                   {
                  (this.state.Lstatus ==='answer')?
                  <p className='labelColor'>
                  Security answer don't match !!!
              </p> 
                      :null
                } 

                {
                  this.state.Verror===true?
                  <p className='labelColor'>
                  Validation Error !!!
              </p> :null
                }
                      <Form>
                       
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control name="email" type="email" value={this.state.email} onChange={this.handleChange}   onBlur={this.form.handleBlurEvent} placeholder="Enter email" />
                            {this.state.errors.email ? <label className="labelColor" name="erremail">{this.state.errors.email}</label>
                         : null}
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="What is your pet name?" name="securityAnswer" value={this.state.securityAnswer} onChange={this.handleChange}   onBlur={this.form.handleBlurEvent} />
                            {this.state.errors.securityAnswer ? <label className="labelColor"  name="errSanswer">{this.state.errors.securityAnswer}</label>
                         : null}
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="New Password" name="password"  value={this.state.password} onChange={this.handleChange}   onBlur={this.form.handleBlurEvent} />
                            {this.state.errors.password ? <label className="labelColor" name="errPassword">{this.state.errors.password}</label>
                         : null}
                        </Form.Group>
                        {
                          this.state.errors.email || this.state.errors.securityAnswer || this.state.errors.password?
                          null
                          :
                          <Button name="forget" className=" button btn-block" variant="primary" type="submit" onClick={this.forget}>
                           Change Password
                        </Button>
                        }
                        
                        <Form.Group controlId="formBasicText">
                            <Form.Text className="forget">Login: <a href="/">Click Here</a></Form.Text>
                        </Form.Group>
                        </Form>
        </div>
       </div>

)}
    

}
export default Forget;