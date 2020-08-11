import React, { Component } from "react";

import axois from "axios";
import ActivitiesView from "../../ActivitiesView";
import StudentNav from "../../NavBar/StaffNav";
class ViewActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
  }

  componentDidMount() {
    //for getting activities
    axois
      .get("http://localhost:3012/api/v1/activities", this.state.config)
      .then((response) => {
        this.setState({
          activities: response.data,
        });
      });
  }

  render() {
    return (
      <>
        <StudentNav />
        <div className="container">
          <ActivitiesView activities={this.state.activities} />
        </div>
      </>
    );
  }
}

export default ViewActivities;
