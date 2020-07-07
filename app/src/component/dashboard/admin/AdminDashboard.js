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
        name: '',
        email: '',
        isSelected:'',
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
                //for getting all student
      axois.get('http://localhost:3012/api/v1/users/staff', this.state.config)
      .then((response=>{
        console.log(response)
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
  searchChange = e => {
    if(e.target.value==="fullname"){
       this.setState({
         isSelected: "fullname"
         
 
       })
      }
      if(e.target.value==="email"){
        this.setState({
          isSelected:"email"
         
        })
    
      }
         }
        
    
        searchByName= e=> {
          this.setState ({
            [e.target.name]:e.target.value  
            })
                 axois.get("http://localhost:3012/api/v1/search",this.state.config,this.state)
          .then(response=>{
            
            var x = [];
             
            response.data.forEach(element => {
              this.state.name=this.state.name.toLowerCase()

              if(element.fullName.toLowerCase().includes(this.state.name)){
                x.push(element);
              }
            });
    
            this.setState({
              allUsers:x
          })
            console.log(x);
          })
          .catch(err=>{
            console.log(err.response);
          })
        }
    
//---------------------
searchByEmail= e=> {
  this.setState ({
    [e.target.name]:e.target.value  
    })
         axois.get("http://localhost:3012/api/v1/search",this.state.config,this.state)
  .then(response=>{
    
    var x = [];
     
    response.data.forEach(element => {
      this.state.email=this.state.email.toLowerCase()

      if(element.email.toLowerCase().includes(this.state.email)){
        x.push(element);
      }
    });

    this.setState({
      allUsers:x
  })
    console.log(x);
  })
  .catch(err=>{
    console.log(err.response);
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
                        <div className="container">   
                          <div className="row">
                          <div className="col-md-6" > 
                         <Form.Group controlId="search">
                                <Form.Control as="select" name= "search"  onChange ={this.searchChange} >
                                    <option>Filter By</option>
                                    <option>fullname</option>
                                    <option>email</option>
                                </Form.Control>
                                </Form.Group>

                         </div>
                         <div className="col-md-6" >
                         {this.state.isSelected==="fullname"?
                         <Form.Group controlId="search">
                         <Form.Control placeholder = "searchByName" name="name" type="text"  value ={this.state.name} onChange ={this.searchByName } />                  
                     </Form.Group>
                         :null                                        
                        }  

                    {this.state.isSelected==="email"?
                         <Form.Group controlId="search">
                         <Form.Control placeholder = "searchByEmail" name="email" type="text"  value ={this.state.email} onChange ={this.searchByEmail } />                  
                     </Form.Group>
                         :null                                        
                        }  


                            </div>   

                          </div>


                         
                        </div>
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