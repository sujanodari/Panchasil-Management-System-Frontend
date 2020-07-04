import React, {Component} from 'react';
import AdminNav from '../../NavBar/AdminNav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
class AddClass extends Component{
    constructor(props){
        super(props)
        this.state={
            class:'',
            section:'',
            success:false,
            Verror:false,
            config: {
                headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
            },
            faliure:false
        }
    }

    handleChange = e => {
        this.setState({
        
            [e.target.name]:e.target.value
        })  
        } 

    addSubject=(e)=>{
        e.preventDefault();
        if(this.state.class==='' || this.state.class==='Choose Class'){
            this.setState({
                Verror:true
            })
        }else if (this.state.section==='' || this.state.section==='Choose Section'){
            this.setState({
                Verror:true
            })
        }else{
            axios.post('http://localhost:3012/api/v1/class',this.state, this.state.config)
            .then(response=>{
                this.setState({
                    success:true,
                    class:'',
                    section:'',
                    Verror:false
                })
            }).catch(err=>{
               if(err.response.status===403){
                   this.setState({
                       faliure:true,
                       Verror:false,
                       success:false
                   })
               }
            })
        }
        
    }

    render (){

        if (this.state.success===true) {
            return (
              <Redirect
                to={{
                  pathname: "/class/view",
                  state: "Class Added"
                }}
              />
            );
          }
        return (
            <div>
               <AdminNav/>
                <div className="container fixed"> 
                <h3 align="center">Add Class</h3>
                {this.state.Verror===true ? <label className="labelColor" name="errEmail">Please Choose the required Fields</label>
                     : null}
                    
                     {this.state.faliure===true ? <label className="labelColor" name="errEmail">Class already exist</label>
                     : null}
                     <Form>
                         <Form.Group controlId="class">
                         <Form.Control as="select" name= "class" value={this.state.class} onChange={this.handleChange}>
                                    <option>Choose Class</option>
                                    <option>PG</option>
                                    <option>Nursery</option>
                                    <option>KG</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    
                                </Form.Control>
                         </Form.Group>
                     
                        <Form.Group>
                        <Form.Control as="select" name= "section" value={this.state.section} onChange={this.handleChange}>
                                    <option>Choose Section</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>
                                </Form.Control>
                        </Form.Group>
                        <Button name="addclass" className="button btn-primary btn-block" variant="primary" type="submit" onClick={this.addSubject}>
                                        Add class
                                    </Button>

                     </Form>
                </div>
            </div>
        )
    }
}

export default AddClass