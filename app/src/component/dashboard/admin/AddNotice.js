import React, {Component} from 'react';
import Nav from '../../NavBar/AdminNav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bsCustomFileInput from 'bs-custom-file-input';
import Validation from "react-form-input-validation";
import axios from 'axios'
import { Redirect } from 'react-router-dom';
class AddNotice extends Component{

    constructor(props){
        super(props)
        this.state={
            errors: {},
            title:'',
            description:'',
            name:'',
            Verror:false,
            file: null,
            image:null,
            config: {
                headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
            },
            success:false,
            imageSuccess:false

        }
        this.form = new Validation(this);
        this.form.useRules({
          title: "required",
          description: "required"
        });
        }

        componentWillMount(){
            axios.get('http://localhost:3012/api/v1/decode', this.state.config)
            .then(response=>{
               this.setState({
                   name:response.data.fullName
               })
            })
        }

        handleChange = e => {
            this.setState({
            
                [e.target.name]:e.target.value
            })
            } 

             //for file select
    handleFileSelect = ((e) => {
        this.setState({
            file: e.target.files[0]
        })
    })

    componentDidMount() {
        bsCustomFileInput.init()
    }

    addNews=e=>{
        e.preventDefault();
          if (this.state.title === '' ) {
                this.setState({
                    Verror:true
                })
          }else if(this.state.description===''){
              this.setState({
                  Verror:true
              })
          }else{
                e.preventDefault();
                axios.post('http://localhost:3012/api/v1/notice',this.state, this.state.config)
                .then(response=>{
                   this.setState({
                       title:'',
                       description:'',
                       Verror:false,
                        image:null,
                        name:'',
                        success:true,
                        imageSuccess:false
                   })
                })

          }
    }

    upload=(e)=>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('myImage', this.state.file)
        axios.post('http://localhost:3012/api/v1/imageUpload',formdata).then
        (response=>{  
             this.setState({
                 file:null,
                 image:response.data.fileName,
                 imageSuccess:true,
                 Verror:false
             })
        }).catch((err) => console.log(err.response))

    }
    render(){
        if (this.state.success===true) {
            return (
              <Redirect
                to={{
                  pathname: "/notice/view",
                  state: "Notice added"
                }}
              />
            );
          }

        return(
            <>
            <Nav/>

            <div className="container fixed">
                <h5 align="center" >Publish Notice</h5>
            <Form>
            {this.state.success===true ? <label className="labelColor" name="errEmail">Notice added</label>
                     : null}

            {this.state.imageSuccess===true ? <label className="labelColor" name="errEmail">Notice Image added</label>
                     : null}         
            {this.state.Verror===true ? <label className="labelColor" name="errEmail">Validation error</label>
                     : null}
                <Form.Group controlId="formBasicEmail">
                    <Form.Control name="title" value={this.state.title} onChange={this.handleChange}   onBlur={this.form.handleBlurEvent} type="text" placeholder="Enter title" />
                    {this.state.errors.title ? <label className="labelColor" name="errEmail">{this.state.errors.title}</label>
                     : null}
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control value={this.state.description} name="description" onChange={this.handleChange}   onBlur={this.form.handleBlurEvent} as="textarea" rows="3" placeholder="Enter description of the news" />
                    {this.state.errors.description ? <label className="labelColor" name="errEmail">{this.state.errors.description}</label>
                     : null}
                </Form.Group>
                <Form.Group>
                <div className="custom-file">
                <input id="inputGroupFile01" type="file" className="custom-file-input" onChange={this.handleFileSelect} />
                                <label className="custom-file-label" >Choose News Image</label>
                </div>
                {this.state.file ? (
                   <Button variant="success" onClick={this.upload} type="submit" className="btn-block">
                   Upload News Image
               </Button>  
                ) : null}

                
                </Form.Group>
                <Button variant="success" onClick={this.addNews} type="submit" className="btn-block">
                    Publish
                </Button>
                </Form>
            </div>
            </>
        )
    }
}

export default AddNotice