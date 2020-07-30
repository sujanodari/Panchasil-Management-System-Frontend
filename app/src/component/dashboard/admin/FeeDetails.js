import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Nav from "../../NavBar/AdminNav";
class FeeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      status: false,
      Fees: [],
      status: false,
      config: {
        headers: {
          Authorization: ` ${localStorage.getItem("myToken")}`,
        },
      },
      message: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3012/api/v1/fees", this.state.config)
      .then((response) => {
        this.setState({
          Fees: response.data,
        });
      });
  }

  render() {
    if (this.state.status === true) {
      return <Redirect to="/report/feeDetails" />;
    } else {
      const { error, Fees } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else {
        return (
          <div>
                <Nav />
            <div className="container table-fixed">
              <Table
                responsive
                striped
                bordered
                hover
                size="sm"
                variant="dark"
                className="admin"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Tuition Fee</th>
                    <th>ECA Fee</th>
                    <th>Trans Fee</th>
                    <th>Exam Fee</th>
                    <th>Last Due</th>
                    <th>Total Invoice</th>
                    <th>Fee Paid</th>
                    <th>Report</th>
                  </tr>
                </thead>
                <tbody>
                  {Fees.map((Fees, index) => (
                    <tr key={Fees.feesID}>
                      <td>{Fees.feesID}</td>
                      <td>{Fees.fullName}</td>
                      <td>{Fees.grade}</td>
                      <td>{Fees.section}</td>
                      <td>{Fees.tuition}</td>
                      <td>{Fees.eca}</td>
                      <td>{Fees.trans}</td>
                      <td>{Fees.examfee}</td>
                      <td>{Fees.lastdue}</td>
                      <td>{Fees.totalInvoice}</td>
                      <td>{Fees.feePaid}</td>
                      <td>
                         <a
                      href={`feeClearanceDetails/${Fees.feesID}`}
                      className="btn btn-primary"
                    >
                      {" "}
                      clearance{" "}
                    </a>
                    <a
                      href={`feeInvoiceReports/${Fees.feesID}`}
                      className="btn btn-secondary"
                    >
                      {" "}
                      Invoice{" "}
                    </a>
                    
                    </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        );
      }
    }
  }
}

export default FeeDetails;
