import React, { Component } from 'react'
import Table from "react-bootstrap/Table";
import axios from 'axios';
import Button from 'react-bootstrap/Button'

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      enrolls: [],
      config: {
        headers: { 'Authorization': ` ${localStorage.getItem('myToken')}` }
      }

    }


  }

  componentDidMount() {
    axios.get('http://localhost:3012/api/v1/enroll', this.state.config)
      .then(response => {
        this.setState({
          enrolls: response.data
        })
      })
  }

  handleDelete = (userId, index) => {
    axios.delete(
      "http://localhost:3012/api/v1/users/" +
      userId, this.state.config

    )
      .then(function (response) {
        console.log(response.data)
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err)
      })
  };
  render() {

    const { allUsers } = this.props

    return (
      <div>
        <div className="container table-fixed">
          <h3 align="center">No. of Users: {allUsers.length}</h3>

          <Table responsive striped bordered hover size="sm" variant="dark" className="admin">
            <thead>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>UserType</th>
                <th>Parent Name</th>
                <th>Enroll</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allUsers.map((allUsers, index) =>
                  <tr key={allUsers.userId}>
                    <td>{allUsers.userId}

                    </td>
                    <td>{allUsers.fullName}</td>
                    <td>{allUsers.email}</td>
                    <td>{allUsers.userType}</td>
                    <td>{allUsers.parentName}</td>
                    <td>{
                      allUsers.userType === 'Student' ?


                        <a href={`enroll/${allUsers.userId}`} className="btn btn-success"> Enroll Class </a>


                        : <a href="#" className="btn btn-primary">Enroll Teacher</a>

                    }

                    </td>


                    <td>

                      <a href={`userAction/${allUsers.userId}`} className="btn btn-info"> Edit </a>


                      <Button className="btn btn-danger" type="submit"
                        onClick={() =>
                          this.handleDelete(allUsers.userId, index)
                        }
                      >Delete</Button>

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