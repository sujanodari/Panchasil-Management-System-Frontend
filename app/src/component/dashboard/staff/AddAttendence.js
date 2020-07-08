import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
class AddAttendence extends Component{
    constructor(props){
        super(props)
        this.state=({
            success:false,
            err:false,
            config: {
                headers: {
                    'Authorization': ` ${localStorage.getItem('myToken')}`
                }
            }
        })
    }

    componentDidMount(){
        Axios({
            method:'put',
            url: `http://localhost:3012/api/v1/users/add/attendence/${this.props.match.params.id}`,
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('myToken')}
        }).then(response=>{
            if(response.data.status===200){
                this.setState({
                    success:true
                })
            }
        }).catch(err=>{
            if(err.response.data.status===404){
                this.setState({
                    err:true
                })
            }
        })
    }
    render(){
        if(this.state.success===true){
            return (
                <Redirect
                  to={{
                    pathname: "/staff/attendence"
                  }}
                />
              );
        }
        if(this.state.err===true){
            return (
                <Redirect
                  to={{
                    pathname: "/staff/attendence",
                    state:'User not found'
                  }}
                />
              );
        }
        return(
            <p>Add</p>
        )
    }
}

export default AddAttendence