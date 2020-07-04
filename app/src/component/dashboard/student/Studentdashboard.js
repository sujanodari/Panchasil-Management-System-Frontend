import React, {Component} from 'react'; 
import Nav from '../../NavBar/StudentNav'
import axois from 'axios'
import Notice from '../../Notice';

class Studentdashboard extends Component{
       constructor(props){
              super(props)
              this.state={
                fullname:'',
                config: {
                  headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
              },
              notices:[],
              
              }
            }

            componentDidMount(){
              //for getting username 
              axois.get('http://localhost:3012/api/v1/decode', this.state.config)
              .then((response=>{
                this.setState({
                    fullname:response.data.fullName,
                   
                })
              }))

                 //for getting notice 
        axois.get('http://localhost:3012/api/v1/notice', this.state.config)
        .then((response=>{
          this.setState({
              notices:response.data
          })
        }))

            }

render(){
 

return(

       <div >
              <Nav/>
        <p align="center"><label id="welcome"> Welcome</label>: <b>{this.state.fullname}</b> </p> 
        {
          this.state.notices.length===0?null:
          <Notice notices={this.state.notices}/> 
        }    
       
         </div>

)}
    

}
export default Studentdashboard;