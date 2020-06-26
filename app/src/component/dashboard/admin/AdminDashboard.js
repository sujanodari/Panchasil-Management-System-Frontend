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
          config: {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('myToken')}` }
          }
      }
  }

  componentDidMount(){
      //for getting unapproved user
      axois.get('http://localhost:3012/api/v1/users/approve', this.state.config)
      .then((response=>{
        this.setState({
            users:response.data
        })
      }))
  }
  

render(){   
return(

       <div >  
         <AdminNav/> 

         <div >
        <p align="center" className="admin"><label id="welcome" > Welcome</label> admin </p>      
         </div>
            {
                this.state.users.length===0?<p>All users are approved</p>
                : <Approve users={this.state.users}/>
            }
           
           
         </div>

)}
    

}
export default AdminDashboard;