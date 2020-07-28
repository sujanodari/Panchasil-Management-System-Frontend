import React, {Component } from "react"
import Nav from '../../NavBar/StaffNav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axois from 'axios'
import { Redirect } from 'react-router-dom';



class  AddExam extends Component

{
    constructor(props){
        super(props);
    this.state=({
        verror:false,
        success:false,
        already:false,
        Exam_type:"",  
        ExamDate:"",
        config: {
            headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
        },
    
          })
        }
        handleChange = e => {
            this.setState({
            
                [e.target.name]:e.target.value
            })
        
        } 

AddExam=e=>{
    e.preventDefault()
    if (this.state.Exam_type==="" || this.state.Exam_type==="Choose Exam Type" ||this.state.ExamDate==="" ){
        this.setState({
            verror:true

        })
    }
    else{
        axois.post('http://localhost:3012/api/v1/exam', this.state,this.state.config)
        .then(response=>{
            this.setState({
                success:true
            })
        })
        .catch(err=>{
            if (err.response.data.status)
            {
                this.setState({
                    already:true,
                    verror:false
                })
            }
        })
    }

}


    render(){
        if (this.state.success=== true) {
            return <Redirect to='/staff/view/exam' />
        }
        return(
            <>
         <Nav/> <br/><br/>
         <div className="container">
         <Form>
         {
            this.state.verror===true?
            <label className='labelColor'>Validation Error</label>
             :null
        }  
         
        {
            this.state.already===true?
            <label className='labelColor'>Exam already added for given date</label>
             :null
        }
            <Form.Group controlId="formGridState">
                <Form.Control as="select" name= "Exam_type"  onChange={this.handleChange}>
                        <option>Choose Exam Type</option>
                        <option>unitTest1</option>
                        <option>unitTest2</option>
                        <option>unitTest3</option>
                        <option>unitTest4</option>
                        <option>terminalExam1</option>
                        <option>terminalExam2</option>
                        <option>terminalExam3</option>
                        <option>terminalExam4</option>
            </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicExamDate">
                                <Form.Control  type="Date" placeholder="Enter Date Of Exam" name="ExamDate" value={this.state.ExamDate} onChange={this.handleChange}  />
                                
                                  </Form.Group>
                <Button name="AddExam" className="button btn-primary btn-block" variant="primary" type="submit" onClick={this.AddExam}>
                                      AddExam
                                    </Button>
        </Form>
         </div>
         </>
        )
    }
}
export default AddExam