import React, { Component } from "react";
//import NavBar from "../NavBar/AdminNav";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//import axois from 'axios'
class Approve extends Component {
  constructor(props) {
    super(props)

    this.state = {
        user: {},
    }
}




  render() {
    const {users} = this.props
    
    return (
      <>
        <div className="container table-fixed">
          <h3 align="center">Approve User Registration</h3>
          <Table responsive striped  bordered hover size="sm" variant="dark" className="admin">
            <thead>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>UserType</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>


            {
                           users.map((user) => 
                                
              <tr key={user.userId}>
                <td>{user.userId }</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.userType }</td>
                <td>
                  <Button
                    className="btn button"
                    name="approve"
                    id="approve"
                    variant="success"
                    type="submit">
                    <i className="fa fa-check" aria-hidden="true"
                    onClick={() => this.props.handleApprove(user.userId)}></i>
                  </Button>
                </td>
              </tr>
              )
              }
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
export default Approve;
