import React, {Component} from 'react'
import axois from 'axios';
import Nav from '../../NavBar/AdminNav'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
class ViewClass extends Component{
    constructor(props){
        super(props)
        this.state={
            allClass:[],
            config: {
                headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
            }
        }
    }
        componentDidMount(){
            //for getting class 
            axois.get('http://localhost:3012/api/v1/class', this.state.config)
            .then((response=>{
              this.setState({
                allClass:response.data
              })
            }))
          
    }

    handleDelete(id){
        axois.delete(`http://localhost:3012/api/v1/class/${id}`, this.state.config)
        .then((response=>{
            axois.get('http://localhost:3012/api/v1/class', this.state.config)
            .then((response=>{
              this.setState({
                allClass:response.data
              })
            }))

        }))
    }

    render(){
        return(
            <>
            <Nav/>

            <div className="container">
            <p align="center">
        <b>No of class: {this.state.allClass.length}</b> </p>
            <hr />
            {/* {
                        this.props.location.state?<label className="labelColor">{this.props.location.state}</label>:null
                      } */}
            {
                this.state.allClass.length===0?<div>No Classes Found</div>
                :
                <div className="row">
                    {
                        this.state.allClass.map((allClass)=>
                        <div className="col-md-4 fix-news">
                           <Card border="danger" style={{ width: '18rem' }}>
                    <Card.Header>ClassID: {allClass.classId}</Card.Header>
                            <Card.Body>
                    <Card.Title>Class: {allClass.class}</Card.Title>
                            <Card.Text>
                    <p>Section: {allClass.section}</p>
                    <Button className="btn-danger btn btn-block" onClick={() =>{if(window.confirm('Are you sure??'))this.handleDelete(allClass.classId)} }>Delete class</Button>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </div>
                        )
                    }
                </div>
            }
         
        
            </div>
            </>
        )
    }
}

export default ViewClass