import React, {Component } from "react"
import Nav from '../../NavBar/StaffNav'
import Button from 'react-bootstrap/Button'

import Table from "react-bootstrap/Table";

import axois from 'axios'

class ExamUser extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            ExamId:this.props.match.params.id,
            enrolls:[],
            user_id:'',
            email:'',
            name:'',
            UserId:'',
            attendence:'',
            err:false,
            notFound:false,
           config: {
             headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
         },
         }
        }
        componentDidMount(){
            axois.get('http://localhost:3012/api/v1/users', this.state.config)
            .then(response=>{
              const users=[]
              response.data.map(student=>{
                if(student.userType==="Student")
                {
                 
                  users.push(student)
                  this.setState({
                    users:users
                  })
                }
              })
      
            })
      
              axois.get('http://localhost:3012/api/v1/decode', this.state.config)
              .then((response=>{
                axois.get(`http://localhost:3012/api/v1/class/student/${response.data.userId}`, this.state.config)
                .then(response=>{
                  axois.get(`http://localhost:3012/api/v1/enroll/class/${response.data.result.classId}`, this.state.config)
                  .then(response=>{
                    // console.log(response.data)
                    this.setState({
                      enrolls:response.data
                    })
                  })
                }).catch(err=>{
                  if(err.response.status===404){
                   this.setState({
                     notFound:true
                   })
                  }
                })
              }))
      
          }

          addExamUser(id){
              this.setState({
                  UserId:id
              })
            axois.post('http://localhost:3012/api/v1/exam/user',this.state, this.state.config)
            .then (response=>{

                this.setState({
                    UserId:"",
                   err:false, 
                })
                
            })

            .catch(err=>{
                // console.log (err.response.status)
                if(err.response.status===402){
                    this.setState({
                       err:true 
                    })
                }
            })
          }

    render(){
        return(
            <>
           <Nav/>
           <hr/>
    
           <div className="container">

           {
this.state.err?<p align="center"><label className="labelColor">use already added in exam</label></p>:null
}       
{
this.props.location.state?<p align="center"><label className="labelColor">{this.props.location.state}</label></p>:null
}

{
  this.state.notFound===true?<p align="center"><label className="labelColor">class not found</label></p>:
<>  <h4 align="center">No of Students: {this.state.users.length}</h4>
  <Table
      responsive
      striped
      bordered
      hover
      size="sm"
      variant="dark"
      className="admin"
    >
      <thead>
        <tr>
          <th>UserId</th>
          <th>FullName</th>
          
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.users.map((user) => (
          <tr key={user.userId} 
          value={this.state.user_id=user.userId} >
            
            {
           
              this.state.enrolls.map((enrolls)=>
              {
                if(enrolls.user_id===this.state.user_id){
                    this.state.student_name=user.fullName
                    this.state.email=user.email
                    this.state.attendence=user.attendance
                   
                }
              }
              )
            }
             <td>
             {this.state.user_id}
             
           </td>
           <td>
             {this.state.student_name}
             
           </td>
           {this.state.email}
           <td>
           <Button variant="success" onClick={()=> this.addExamUser(this.state.user_id)} type="submit" className="btn-block">
                            Add user for exam 
                                 </Button>
             
           </td>
           <td>
            
           </td>                   
          </tr>
        ))}
      </tbody>
    </Table>
    </>
}
    
    </div>
         
        
            
            </>
       )  
    }  
}


export default ExamUser

