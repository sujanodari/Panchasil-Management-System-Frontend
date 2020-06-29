import React, {Component} from 'react'; 
import { Redirect } from 'react-router-dom';
import '../App.css';
import LoginNav from './NavBar/LoginNav';
import Validation from "react-form-input-validation";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import News from './News';
import axois from 'axios'
class Login extends Component{

constructor(props){
    super(props);
this.state=({
    errors: {},
    email:"",
    password:"",
    Verror: false,
    Lstatus:'',
    logged:false,
    type:'',
    news:[]

})
this.form = new Validation(this);
this.form.useRules({
  email: "required|email",
  password: "required|min:6"
});
}

componentDidMount(){
  //for getting news 
  axois.get('http://localhost:3012/api/v1/news', this.state.config)
  .then((response=>{
    console.log(response.data)
    this.setState({
        news:response.data
    })
  }))
}

handleChange = e => {
this.setState({

    [e.target.name]:e.target.value
})
} 

login= (e) => {
    function emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }
      e.preventDefault();
  
      if (
        this.state.email === 0 ||
        emailIsValid(this.state.email) === false
      ) {
        this.setState({
          Verror: true,
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
      else{
        axois.post('http://localhost:3012/api/v1/users/signin', this.state)
        .then((response)=>{
          console.log(response)
          localStorage.setItem('myToken',response.data.usertoken)
          localStorage.setItem('type',response.data.type)
          this.setState({email:'',password:'', logged:true, Lstatus:'', type:response.data.type})
        })
        .catch(err=>{
          if(err.response.status===401){
            this.setState({
                Lstatus:'Not found',logged:false
            })
            }
            if(err.response.status===402){
              this.setState({
                  Lstatus:'Verify',logged:false
              })
              }
            else if(err.response.status===403){
              this.setState({
                  Lstatus:'Password',logged:false
              })
            }
        })
      }
    }
      
render(){
    if (this.state.logged === true && this.state.type==="Admin") {
        return <Redirect to='/admin' />
    }
    if (this.state.logged === true && this.state.type==="Staff") {
      return <Redirect to='/staff' />
    }
    if (this.state.logged === true && this.state.type==="Student") {
      return <Redirect to='/student' />
  }

          if (localStorage.getItem('myToken') && localStorage.getItem("type")==="Admin") {
            return <Redirect to='/admin' />
        }
        if (localStorage.getItem('myToken') && localStorage.getItem("type")==="Staff") {
          return <Redirect to='/staff' />
      }
      if (localStorage.getItem('myToken') && localStorage.getItem("type")==="Student") {
        return <Redirect to='/student' />
      }
return(
    <div>
       <LoginNav/>
        <div>
            <div className="container fixed">
                <div className="row">
                    <div className="col-md-12">
                    <h1 align="center">Login</h1>
                    {
                                    this.state.Verror===true?
                                    <label className='labelColor'>Validation error</label>
                                    :null
                                }
                    {
                  (this.state.Lstatus ==='Not found')?
                  <p className='labelColor'>
                  User not found !!!
              </p> 
                      :null
                }  
                   {
                  (this.state.Lstatus ==='Password')?
                  <p className='labelColor'>
                  Password don't match !!!
              </p> 
                      :null
                } 
                {
                  (this.state.Lstatus ==='Verify')?
                  <p className='labelColor'>
                 User not verified!!!
              </p> 
                      :null
                } 


                    <Form>
                        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control name="email" type="email" id="email" value={this.state.email} onChange={this.handleChange}   onBlur={this.form.handleBlurEvent} placeholder="Enter email" />
                            {this.state.errors.email ? <label className="labelColor" name="errEmail">{this.state.errors.email}</label>
                     : null}
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control name="password" id="password" value={this.state.password} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} type="password" placeholder="Password" />
                            {this.state.errors.password ? <label className="labelColor" name="errPassword">{this.state.errors.password}</label>
                     : null}
                   </Form.Group>
                   {
                     this.state.errors.email ||this.state.errors.password?
                      null
                      :
                      <Button className="btn-block button" id="login" variant="primary" type="submit" onClick={this.login}>
                      Login
                  </Button>
                    
                   }
                        
                        <Form.Group controlId="formBasicText">
                            <Form.Text className="forget">Forget Password: <a href="/forget">Click Here</a></Form.Text>
                        </Form.Group>
                        </Form>
                    </div>

                    

                </div>
            </div>
            <div className="container"> 
                   <News news={this.state.news}/>
        </div>
        
        </div>
    </div>
)}
    

}
export default Login;