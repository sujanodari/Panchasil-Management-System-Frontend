import React, {Component}  from "react"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Nav from '../../NavBar/AdminNav'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Fees extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      status:false,
      verror:false,
      notFound:false,
        tuition: "",
        eca: "",
        trans:"",
        classId: this.props.match.params.id,
        config: {
            headers: {
                'Authorization': ` ${localStorage.getItem('myToken')}`
            }
        },
    }
}
componentDidMount(){
 //for getting class by ID
 axios.get(`http://localhost:3012/api/v1/class/${this.state.classId}` , this.state.config)
 .then((response=>{
    this.setState({
     tuition:response.data.tuition,
     eca: response.data.eca,
     trans:response.data.trans
   })
 }))
}

handleChange = e => {
  this.setState({
      [e.target.name]:e.target.value
  })
 
  } 
updateFee= e => {
   e.preventDefault()
  
    if(this.state.tuition===""|| this.state.eca==="" || this.state.trans==="")  {
         this.setState({
           verror:true,
         })
    }
    else {
      const headers = {
        'authorization': localStorage.getItem("myToken")
    }
    axios.put(`http://localhost:3012/api/v1/fee/${this.state.classId}`,
        this.state,{ headers}
    )

        .then(response => {
          //  console.log(response.data);
          this.setState({
            status:true,

          })
           
        })
        .catch(err => {
     if (err.response.status===404) {
          this.setState({
           notFound: true 
          })
     }
        });


    }
  } 
  

    render (){
      if (this.state.status===true) {
        return (
          <Redirect
            to={{
              pathname: "/class/view",             
            }}
          />
        );
      }

      if (this.state.notFound===true) {
        return (
          <Redirect
            to={{
              pathname: "/class/view",
              state: "Class ot Found"
            }}
          />
        );
      }
         return (
            <div   className = "container"> 
             <Nav/>            
             <br/>
             <br/>
             <br/>

                   {
                     this.state.verror===true?
                     <p align="center" > <label className= "labelColor" >cannot be empty</label> </p> :null
                   }    

            <Form>
            <Form.Group controlId="formBasicTuition">
              <Form.Control name="tuition" value= {this.state.tuition} onChange= {this.handleChange}  type="number" placeholder="Enter tuition fee" />
              </Form.Group>
 

            <Form.Group controlId="formBasicCurriculum">
               <Form.Control  name= "eca" value= {this.state.eca} onChange= {this.handleChange} type="number" placeholder="Extra curriculum fee" />           
            </Form.Group>


            <Form.Group controlId="formBasicTransportation">
              <Form.Control  name= "trans"  value= {this.state.trans} onChange= {this.handleChange}type="number" placeholder="Trasnportation fee" />
            </Form.Group>

            <Button onClick={this.updateFee} className = "btn btn-block" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </div>


         )
    }
}
export default Fees
