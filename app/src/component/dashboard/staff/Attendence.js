import React, {Component} from 'react';
import Nav from '../../NavBar/StaffNav'
import axois from 'axios'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
class Attendence extends Component{
    constructor(props){
        super(props)
        this.state={
           users:[],
           enrolls:[],
           user_id:'',
           email:'',
           name:'',
           attendence:'',
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

    render(){
        return(
            <>
            <Nav/>
            <p align="center">Attendence Here Teacher:</p>
            <hr/>
            <div className="container">

        
        {
        this.props.location.state?<p align="center"><label className="labelColor">{this.props.location.state}</label></p>:null
        }

        {
          this.state.notFound===true?<p align="center"><label className="labelColor">Class is not assigned</label></p>:
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
                  <th>Attendence</th>
                  <th>Email</th>
                  <th>Attendence Action</th>
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
                   <td>
                {this.state.attendence}
                     
                   </td>
                   <td>
                     {this.state.email}
                   </td>
                   <td>
                     <a
                       className="btn btn-success"
                       name="addAttendence"
                       id="add"
                       href={`/attendence/add/${this.state.user_id}`}
                     >
                       <i
                         className="fa fa-plus"
                         aria-hidden="true"

                       ></i>
                     </a>
                     <a
                       className="btn btn-primary"
                       name="subAttendence"
                       id="sub"
                       href={`/attendence/sub/${this.state.user_id}`}
                     >
                       <i
                         className="fa fa-minus"
                         aria-hidden="true"
                        ></i>
                     </a>
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

export default Attendence