import React, { Component } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import NoImage from "./noimage.jpg";
class ActivitiesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: {},
    };
  }
  render() {
    const { activities } = this.props;
    return (
      <>
        <div className="container">
          <p align="center">
            <b>No of activities: {activities.length}</b>
          </p>
          <hr />

          {activities.length === 0 ? (
            <p>No activities available</p>
          ) : (
            <div className="row">
              {activities.map((activities) => (
                <div className="col-md-4 fix-activities">
                  <Card className="mycard">
                    {activities.image == null ? (
                      <Card.Img
                        variant="top"
                        src={NoImage}
                        className="fix-image"
                      />
                    ) : (
                      <a
                        href={`http://localhost:3012/images/${activities.image}`}
                      >
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3012/images/${activities.image}`}
                          className="fix-image"
                          alt="image not found"
                        />
                      </a>
                    )}
                    <Card.Body>
                      <Card.Title>{activities.title}</Card.Title>
                      <b>Activities date</b>
                      <Card.Title>{activities.date}</Card.Title>
                      <Card.Text>{activities.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        <label name="posted">Posted By:</label>
                        {activities.name} at {activities.createdAt}
                      </small>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}
export default ActivitiesView;
