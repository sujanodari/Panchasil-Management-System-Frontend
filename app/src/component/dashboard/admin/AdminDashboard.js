import React, {Component} from 'react'; 
//import '../App.css';
import Approve from './Approve'
import AdminNav from '../../NavBar/AdminNav'
import axois from 'axios'
class AdminDashboard extends Component{

   constructor(props) {
      super(props)
      this.state = {
          users: [],
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


        //for getting username 
        axois.get('http://localhost:3012/api/v1/decode', this.state.config)
        .then((response=>{
          this.setState({
              fullname:response.data.fullName
          })
        }))
      
       
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
            axois.get('http://localhost:3012/api/v1/users/approve', this.state.config)
      .then((response=>{
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
        console.log(err.response)
    })
  }
  

render(){   
return(

       <div >  
         <AdminNav/> 

         <div >
        <p align="center" className="admin"><label id="welcome" > Welcome</label>: {this.state.fullname} </p>  
        {
            this.state.auth===false?
            <p align="center" className="labelColor"><label> User is not authorised to verify</label> </p>  :
            null
        }    
         </div>
            {
                this.state.users.length===0?<p align="center">All users are approved</p>
                : <Approve users={this.state.users}  handleApprove={this.handleApprove}/>
            }
           
           
         </div>

)}
    

}
export default AdminDashboard;