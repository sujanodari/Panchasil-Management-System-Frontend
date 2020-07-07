import React, {Component} from 'react'
import axois from 'axios';
import Nav from '../../NavBar/AdminNav'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
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
        axois.delete(`http://localhost:3012/api/v1/routine/${id}`, this.state.config)
        .then((response=>{
            axois.get('http://localhost:3012/api/v1/class', this.state.config)
            .then((response=>{
              this.setState({
                allClass:response.data
              })
            }))

        }))
    }
    
    

    handleDeleteRoutine= (id) => {
    axois.delete(
    "http://localhost:3012/api/v1/routine/"+
    id, this.state.config
    
            )
              .then(function (response) {
    console.log(response.data)
    window.location.reload();
              })
              .catch(function (err) {
    console.log(err)
              })
          };
    
    
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
                    
                    {
                        allClass.routine?
                        <>
                        <a href={`http://localhost:3012/images/${allClass.routine}`}>
                              <Card.Img variant="top" src={`http://localhost:3012/images/${allClass.routine}`}className="fix-image" alt="image not found" />
                 </a>
                
                    <br/>
                     <Button className="btn-danger btn btn-block" onClick={() =>
                        this.handleDelete(allClass.classId)
                      }  >Delete Routine</Button>
                     </>
                        :
                        <p>
                            <Link to={"/addRoutine/" + allClass.classId}>
                            <Button className="btn-danger btn btn-block" >Add Routine</Button></Link>
                        </p>
                    }
                    
                   
                    <br/>
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