import React, {Component }from 'react'
import Nav from '../../NavBar/AdminNav'
import News from '../../News';
import axois from 'axios';
class ViewNews extends Component{

    constructor(props){
        super(props)
        this.state={
            news:[],
            config: {
                headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
            }
        }
    }

    componentDidMount(){
        //for getting news 
        axois.get('http://localhost:3012/api/v1/news', this.state.config)
        .then((response=>{
          this.setState({
              news:response.data
          })
        }))
      }

    render(){
        return (
            <>
            <Nav/>
            <div className="container"> 
                   <News news={this.state.news}/>
                </div>
            </>
        )
    }
}

export default ViewNews;