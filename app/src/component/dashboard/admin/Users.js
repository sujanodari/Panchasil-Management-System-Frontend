import React, { Component } from 'react'
import Table from "react-bootstrap/Table";
import axois from 'axios'

class Users extends Component{

constructor(props){
    super(props)
    this.state={
      enrolls:[],
      config: {
        headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
    }
    
  }


}

componentDidMount(){
  axois.get('http://localhost:3012/api/v1/enroll', this.state.config)
  .then(response=>{
    this.setState({
      enrolls:response.data
    })
  })
}

    render(){

        const {allUsers} = this.props

        return (
            <div>
                <div className="container table-fixed">
          <h3 align="center">No. of Users: {allUsers.length}</h3>
        
          <Table responsive striped  bordered hover size="sm" variant="dark" className="admin">
            <thead>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>UserType</th>
                <th>Parent Name</th>
                <th>Enroll</th>
              </tr>
            </thead>
            <tbody>
            {
                           allUsers.map((allUsers) =>           
              <tr key={allUsers.userId}>
                <td>{allUsers.userId}
                
                </td>
                <td>{allUsers.fullName}</td>
                <td>{allUsers.email}</td>
                <td>{allUsers.userType}</td>
                <td>{allUsers.parentName}</td>
                <td>{
                    allUsers.userType==='Student' ?
                    

                    <a href={`enroll/${allUsers.userId}`} className="btn btn-success"> Enroll Class </a>


                    :<a href="#" className="btn btn-primary">Enroll Teacher</a>    
                    
                }
                
                </td>
              </tr>

              )
            }
            
                
            </tbody>
          </Table>
         
        </div>
        
            </div>
        )
    }
}

export default Users;