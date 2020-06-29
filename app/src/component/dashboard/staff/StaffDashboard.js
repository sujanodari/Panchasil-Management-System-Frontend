import React, {Component} from 'react'; 
import Nav from '../../NavBar/StaffNav'
import axois from 'axios'
class StaffDashboard extends Component{

  constructor(props){
    super(props)
    this.state={
      fullname:'',
      config: {
        headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
    }
    }
  }


  componentDidMount(){
    //for getting username 
    axois.get('http://localhost:3012/api/v1/decode', this.state.config)
    .then((response=>{
      this.setState({
          fullname:response.data.fullName
      })
    }))
  }

render(){

   
return(

  <div >
     <Nav/>  
  <p align="center"><label id="welcome"> Welcome</label> :{this.state.fullname} </p>
     
   </div>

)}
    

}
export default StaffDashboard;