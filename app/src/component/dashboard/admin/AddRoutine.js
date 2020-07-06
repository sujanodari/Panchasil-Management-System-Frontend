import React, { Component } from 'react'
import Nav from '../../NavBar/AdminNav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bsCustomFileInput from 'bs-custom-file-input';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
class AddRoutine extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            classId: this.props.match.params.id,
            Verror: false,
            file: null,
            routine: null,
            success: false,
            imageSuccess: false,
            message: "",
        }
    }
 
    handleFileSelect = ((e) => {
        this.setState({
            file: e.target.files[0]
        })
    })
 
    componentDidMount() {
        bsCustomFileInput.init()
    }
 
    upload = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('myImage', this.state.file)
        axios.post('http://localhost:3012/api/v1/imageUpload', formdata).then
            (response => {
                this.setState({
                    file: null,
                    routine: response.data.fileName,
                    imageSuccess: true,
                    Verror: false
                })
            }).catch((err) => console.log(err.response))
 
    }
 
    handleSubmit = event => {
        event.preventDefault();
        const headers = {
            'authorization': localStorage.getItem("myToken")
        }
        axios.put(`http://localhost:3012/api/v1/routine/${this.state.classId}`,
            this.state, { headers })
            .then(response => {
                this.setState({
                    Verror: false,
                    routine: null,
                    success: true,
                    imageSuccess: false
                })
            })
    };
    render() {
        if (this.state.success===true) {
            return (
              <Redirect
                to={{
                  pathname: "/class/view",
                  state: "Routine Added"
                }}
              />
            );
          }
        return (
            <div>
                <Nav />
                <div className="container fixed">
                    <h5 align="center" >Add Routine</h5>
                    <Form>
                        {this.state.imageSuccess === true ? <label className="labelColor" name="errEmail">Routine added</label>
                            : null}
                        {this.state.Verror === true ? <label className="labelColor" name="errEmail">Validation error</label>
                            : null}
                        <Form.Group>
                            <div className="custom-file">
                                <input id="inputGroupFile01" type="file" className="custom-file-input"
                                    onChange={this.handleFileSelect} />
                                <label className="custom-file-label" >Choose Routine</label>
                            </div>
                            {this.state.file ? (
                                <Button variant="success" onClick={this.upload} type="submit" className="btn-block">
                                    Upload Routine
                                </Button>
                            ) : null}
                        </Form.Group>
                        <Button variant="success" onClick={this.handleSubmit} type="submit" className="btn-block">
                            Add
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}
 
export default AddRoutine