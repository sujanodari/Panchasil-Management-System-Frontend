import React, { Component } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import axois from "axios";
import NoImage from "./noimage.jpg";
import { Button } from "react-bootstrap";
class ActivitiesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: {},
      config: {
        headers: { Authorization: ` ${localStorage.getItem("myToken")}` },
      },
    };
  }
  handleDelete = (id) => {
    axois
      .delete(
        `http://localhost:3012/api/v1/activities/${id}`,
        this.state.config
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
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
                    {localStorage.getItem("type") === "Admin" ||
                    localStorage.getItem("type") === "Staff" ? (
                      <>
                        <br />
                        <Button
                          className="btn btn-danger"
                          type="submit"
                          onClick={() =>
                            this.handleDelete(activities.activitiesId)
                          }
                        >
                          Delete
                        </Button>
                      </>
                    ) : null}
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
        <br />
        <br />
      </>
    );
  }
}
export default ActivitiesView;
