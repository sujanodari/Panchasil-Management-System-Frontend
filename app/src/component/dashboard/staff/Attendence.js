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
            //  console.log(response.data.result.classId)
            axois.get(`http://localhost:3012/api/v1/enroll/class/${response.data.result.classId}`, this.state.config)
            .then(response=>{
              // console.log(response.data)
              this.setState({
                enrolls:response.data
              })
            })
          })
        }))

    }

    handleAdd=(id)=>{
      console.log(id)
    }


    render(){
        return(
            <>
            <Nav/>
            <p align="center">Attendence Here Teacher:</p>
            <hr/>
            <div className="container">

        <h4 align="center">No of Students: {this.state.users.length}</h4>
        {
        this.props.location.state?<p align="center"><label className="labelColor">{this.props.location.state}</label></p>:null
        }
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
                {this.state.enrolls.map((user) => (
                  <tr key={user.enrollId} 
                  value={this.state.enroll_id=user.enrollId,
                   this.state.user_id=user.user_id,
                   this.state.class_id=user.class_id} >
                   
                    {
                      this.state.users.map((users)=>
                      {
                        if(users.userId===this.state.user_id){
                            this.state.student_name=users.fullName
                            this.state.email=users.email
                            this.state.attendence=users.attendance
                           
                        }
                      }
                      )
                    }

                    {
                        this.state.student_name?
                         <>
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
                   </>
                        :null
                    }
                   
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
            </>

            
        )
    }
}

export default Attendence