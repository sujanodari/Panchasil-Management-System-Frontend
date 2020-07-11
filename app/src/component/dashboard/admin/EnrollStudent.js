import React, {Component} from 'react';
import AdminNav from '../../NavBar/AdminNav'
import Validation from "react-form-input-validation";
import Form from 'react-bootstrap/Form';
import axois from 'axios';
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom';
class EnrollStudent extends Component{

    constructor(props){
        super(props)
        this.state={
            class:'',
            year:'',
            section:'',
            student_id: this.props.match.params.id,
            errors: {},
            Verror:false,
            already:false,
            status:false,
            cnotfound:false,
            unotfound:false,
            cerror:false,
            classes:[],
            config: {
                headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
            }, 
        }
        this.form = new Validation(this);
    this.form.useRules({
      year:'required|date'
    });
}

componentDidMount(){
  axois.get(`http://localhost:3012/api/v1/class`, this.state.config)
  .then(response=>{
    console.log(response.data)
    this.setState({
      classes:response.data
    })
  })
}


handleChange = e => {
    this.setState({
    
        [e.target.name]:e.target.value
    })  
    }
    
    enroll=(e)=>{
        e.preventDefault();

        if(this.state.year===''){
            this.setState({
                Verror:true,
                cerror:false
            })
        }
        else if(this.state.class==='' || this.state.class==='Choose class'){
            this.setState({
                cerror:true,
                Verror:false
            })
        }
        else if(this.state.section==='' || this.state.section==='Choose section'){
            this.setState({
                cerror:true,
                Verror:false
            })
        }
        else{

            
            axois.post(`http://localhost:3012/api/v1/enroll/${this.state.student_id}`, this.state,this.state.config)
            .then(response=>{

                if(response.data.status===201){
                    this.setState({
                        status:true,
                    })
                }
            }).catch(err=>{
               if(err.response.status===403){
                    this.setState({
                        cnotfound:true
                    })
               }
              else if(err.response.status===404){
                this.setState({
                    already:true
                })
           }
           else if(err.response.status===405){
            this.setState({
                unotfound:true
            })
       }
            })
        }
        
       
    }

render(){

    if (this.state.status===true) {
        return (
          <Redirect
            to={{
              pathname: "/show/enroll",
              state: "Enroll success"
            }}
          />
        );
      }
      else if (this.state.already===true) {
        return (
          <Redirect
            to={{
              pathname: "/admin",
              state: "Already enrolled"
            }}
          />
        );
      }
      else if (this.state.cnotfound===true) {
        return (
          <Redirect
            to={{
              pathname: "/admin",
              state: "Class not found"
            }}
          />
        );
      }

      else if (this.state.unotfound===true) {
        return (
          <Redirect
            to={{
              pathname: "/admin",
              state: "User not found"
            }}
          />
        );
      }

    return(
        <div>
           <>
           <AdminNav/>
           <div className="container fixed">
               <p align="center">Enroll </p>
               {
                   this.state.Verror===true?<label className="labelColor">Validation error</label>:null
               }

{
                   this.state.cerror===true?<label className="labelColor">Choose right input fields</label>:null
               }
               
                <Form>
                <Form.Group controlId="class">
                                <Form.Control as="select" name= "class" value={this.state.class} onChange={this.handleChange}>
                                    <option>Choose class</option>
                               {
                                 this.state.classes.map((classes) => (
                                 <option>{classes.class}</option>
                                 ))}

                                
                                </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="section">
                                <Form.Control as="select" name= "section" value={this.state.section} onChange={this.handleChange}>
                                    <option>Choose section</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>
                                </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="year">
                                <Form.Control  type="Date" placeholder="Enter year" name="year" value={this.state.year} onChange={this.handleChange}   onBlur={this.form.handleBlurEvent} />
                                {this.state.errors.year ? <label className="labelColor" name="year">{this.state.errors.year}</label>
                                 : null}
                                  </Form.Group>

                                  {
                                         this.state.errors.year? null:
                                    <Button name="enrollStudent" className="button btn-primary btn-block" variant="primary" type="submit" onClick={this.enroll}>
                                        Enroll
                                    </Button>
                                     }
                </Form>
           </div>
           </>
        </div>
    )
}

}

export default EnrollStudent;