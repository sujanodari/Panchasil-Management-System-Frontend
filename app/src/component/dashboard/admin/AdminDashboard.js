import React, {Component} from 'react'; 
import Approve from './Approve'
import AdminNav from '../../NavBar/AdminNav'
import axois from 'axios'
import Users from './Users'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

class AdminDashboard extends Component{

   constructor(props) {
      super(props)
      this.state = {
          users: [],
          allUsers:[],
          type:'',
          fullname:'',
          config: {
              headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
          }, 
          auth:true
      }
  }

  componentDidMount(){
      //for getting unapproved user
      axois.get('http://localhost:3012/api/v1/approve', this.state.config)
      .then((response=>{
        this.setState({
            users:response.data
        })
      }))

      //for getting all users
      axois.get('http://localhost:3012/api/v1/users', this.state.config)
      .then((response=>{
        this.setState({
            allUsers:response.data
        })
      }))


        //for getting username 
        axois.get('http://localhost:3012/api/v1/decode', this.state.config)
        .then((response=>{
          this.setState({
              fullname:response.data.fullName
          })
        }))  
  }

  handleChange = e => {
    this.setState({
    
        [e.target.name]:e.target.value
    })
        if(e.target.value==='Student'){
            //for getting all student
      axois.get('http://localhost:3012/api/v1/users/student', this.state.config)
      .then((response=>{
        this.setState({
            allUsers:response.data
        })
      }))

        }else if(e.target.value==="Staff"){
                //for getting all staff
      axois.get('http://localhost:3012/api/v1/users/staff', this.state.config)
      .then((response=>{
        this.setState({
            allUsers:response.data
        })
      }))
        }

    } 

  //for approving  users
  handleApprove = (users) => {
     axois({
    method:'put',
    url: `http://localhost:3012/api/v1/approve/${users}`,
    headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('myToken')}
})
    .then(response=>{
        
        if(response.data.status===201){
            axois.get('http://localhost:3012/api/v1/approve', this.state.config)
      .then((response=>{

        axois.get('http://localhost:3012/api/v1/users', this.state.config)
        .then((response=>{
          this.setState({
              allUsers:response.data
          })
        }))

        this.setState({
            users:response.data
        })
      }))
        }
       else if(response.data.code===404){
            this.setState({
                auth:false
            })
        }
    }).catch(err=>{
        
    })
  }
  

render(){   
return(

       <div >  
         <AdminNav/> 

         <div >
        <p align="center" className="admin"><label id="welcome" > Welcome</label>: <b>{this.state.fullname}</b> </p>  
        {
            this.state.auth===false?
            <p align="center" className="labelColor"><label> User is not authorised to verify</label> </p>  :
            null
        }    
         </div>
           

            <div className="container-fluid">
                <div className="row">

                <div className="col-md-5">
                   <Card border="dark">
                    <Card.Header >Approval</Card.Header>
                    <Card.Body>
                      <Card.Title>Approve User Here</Card.Title>
                      <Card.Text>
                      {
                this.state.users.length===0?<p align="center">All users are approved</p>
                : <Approve users={this.state.users}  handleApprove={this.handleApprove}/>
                     }
                      </Card.Text>
                    </Card.Body>
                  </Card>
                   
                    </div>
                    
                    <div className="col-md-6">
                      {
                        this.props.location.state?<label className="labelColor">{this.props.location.state}</label>:null
                      }

                      <Card border="primary">
                        <Card.Header>
                        <Form.Group controlId="type">
                                <Form.Control as="select" name= "type" value={this.state.type} onChange={this.handleChange}>
                                    <option>Choose User Type</option>
                                    <option>Student</option>
                                    <option>Staff</option>
                                </Form.Control>
                                </Form.Group>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                         
                          </Card.Title>
                          <Card.Text>
                          
                    <Users  allUsers={this.state.allUsers} />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    
                  
                    </div>
                </div>
            </div>
           
           
         </div>

)}
    

}
export default AdminDashboard;