import React, {Component }from 'react'
import Nav from '../../NavBar/AdminNav'
import Notice from '../../Notice';
import axois from 'axios';
class ViewNotice extends Component{

    constructor(props){
        super(props)
        this.state={
            notices:[],
            config: {
                headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
            }
        }
    }

    componentDidMount(){
        //for getting notice 
        axois.get('http://localhost:3012/api/v1/notice', this.state.config)
        .then((response=>{
          this.setState({
              notices:response.data
          })
        }))
      }

    render(){
        return (
            <>
            <Nav/>
            <div className="container"> 
                   <Notice notices={this.state.notices}/>
                </div>
            </>
        )
    }
}

export default ViewNotice;