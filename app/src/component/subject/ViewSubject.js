import React, {Component }from 'react'
import Nav from '../NavBar/AdminNav'
import Subject from './Subject';

class ViewSubject extends Component{

    constructor(props){
        super(props)
       
    }

  

    render(){
        return (
            <>
            <Nav/>
            <div className="container"> 
                 <Subject/>
                </div>
            </>
        )
      
    }
}

export default ViewSubject;