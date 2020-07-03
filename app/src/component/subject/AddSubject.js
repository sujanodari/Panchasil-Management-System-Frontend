import React, {Component} from 'react';
import Nav from '../NavBar/AdminNav'
import Form from 'react-bootstrap/Form'
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Validation from "react-form-input-validation";
import axios from 'axios'


class AddSubject extends Component{

    constructor(props){
        super(props)
        this.state={
            errors: {},
            subjectName:'',
            Verror:false,
            config: {
                headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
            },
            success:false

        }
        this.form = new Validation(this);
        this.form.useRules({
            subjectName: "required"
        });
        }

        handleChange = e => {
            this.setState({
            
                [e.target.name]:e.target.value
            })
            } 

        addSubject=e=>{
        e.preventDefault();
          if (this.state.subjectName === '' ) {
                this.setState({
                    Verror:true
                })
          }else{
                e.preventDefault();
                axios.post('http://localhost:3012/api/v1/subjects',this.state, this.state.config)
                .then(response=>{
                   this.setState({
                       subjectName:'',
                       Verror:false,
                       success:true
                   })
                })

          }
    }

    render(){
        if(this.state.success===true){
            return <Redirect to='/subject/view' />
        }
        else {
        return(
            <>
            <Nav/>

            <div className="container fixed">
                <h5 align="center" >Add Subject</h5>
            <Form>
            {this.state.success===true ? <label className="labelColor" name="errEmail">Subject added</label>
                     : null}      
            {this.state.Verror===true ? <label className="labelColor" name="errEmail">Validation error</label>
                     : null}
                <Form.Group controlId="formBasicEmail">
                    <Form.Control name="subjectName" value={this.state.subjectName} onChange={this.handleChange}   onBlur={this.form.handleBlurEvent} type="text" placeholder="Enter Subject" />
                    {this.state.errors.subjectName ? <label className="labelColor" name="errEmail">{this.state.errors.title}</label>
                     : null}
                </Form.Group>
                <Button variant="success" onClick={this.addSubject} type="submit" className="btn-block">
                    Add
                </Button>
                </Form>
            </div>
            </>
        )
     }
    }
}

export default AddSubject