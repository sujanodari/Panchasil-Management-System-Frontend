import React, {Component} from 'react';
import AdminNav from '../NavBar/AdminNav'
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
class AddClassSubject extends Component{

    constructor(props){
        super(props)
        this.state={
            classId:'',
            subId: this.props.match.params.id,
            errors: {},
            status:false,
            subjects:[],
            classes:[],
            subjectName:'',
            success:false,
            faliure:false,
            config: {
                headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
            }, 
        }
}


componentDidMount(){

    axios.get('http://localhost:3012/api/v1/subjects', this.state.config)
    .then((response=>{
      this.setState({
        subjects:response.data

      })
    }))

 
    axios.get('http://localhost:3012/api/v1/class', this.state.config)
    .then((response=>{
      this.setState({
        classes:response.data

      })
    }))

    this.state.subjects.maps((subjects) =>
    {if(subjects.subId === this.state.subId){
     this.state.subjectName=subjects.subjectName
    }} 
     )
 
}
 


handleChange = e => {
    this.setState({
    
        [e.target.name]:e.target.value
    })  
    }
    
   
addSubjectClass (id) {
    this.state.classId=id;
    console.log(this.state.classId, this.state.subId);
    axios.post('http://localhost:3012/api/v1/subjectsClass',this.state, this.state.config)
    .then(response=>{
        this.setState({
            success:true,
            classId:'',
            subId:''
        })
        console.log(response);
    }).catch(err=>{
       if(err.response.status===403){
           this.setState({
               faliure:true,
               Verror:false,
               success:false
           })
       }
    })
}

render(){
    if (this.state.success === true) {
        return <Redirect to='/subject/view' />
    }
    return(
        <div>
           <>
           <AdminNav/>
           <div className="container fixed"> 
                <h3 align="center">Add Subject for Class</h3>
                     {this.state.success===true ? <label className="labelColor" name="errEmail">Class added</label>
                     : null}
                     {this.state.faliure===true ? <label className="labelColor" name="errEmail">Class already exist</label>
                     : null}
                  
                     <Table striped bordered hover variant="dark">
                        <thead title="ssss">
                            <tr>
                            <th>Class</th>
                            <th>Section</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {  this.state.classes.map((classes)=>
                            <tr value={ this.state.classId=classes.classId
                               }>
                               
                            <td>{classes.class}</td>
                           
                            <td> {classes.section}</td>
                
                            <td><Button variant="success" onClick={()=> this.addSubjectClass(classes.classId)} type="submit" className="btn-block">
                            Add Subject for Class
                                 </Button>
                          </td>
                            </tr>
                             )} 
                        </tbody>
</Table>
                </div>

           </>
        </div>
    )
}

}

export default AddClassSubject;