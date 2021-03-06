import React, { Component } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";

import NoImage from "./noimage.jpg";
class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: {},
    };
  }
  render() {
    const { notices } = this.props;
    return (
      <>
        <div className="container">
          <p align="center">
            <b>No of notice: {notices.length}</b>
          </p>
          <hr />

          {notices.length === 0 ? (
            <p>No news available</p>
          ) : (
            <div className="row">
              {notices.map((notices) => (
                <div className="col-md-4 fix-news" key={notices.noticeId}>
                  <Card className="mycard">
                    {notices.image == null ? (
                      <Card.Img
                        variant="top"
                        src={NoImage}
                        className="fix-image"
                      />
                    ) : (
                      <a href={`http://localhost:3012/images/${notices.image}`}>
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3012/images/${notices.image}`}
                          className="fix-image"
                          alt="image not found"
                        />
                      </a>
                    )}
                    <Card.Body>
                      {localStorage.getItem("type") === "Admin" &&
                      localStorage.getItem("myToken") ? (
                        <small>
                          <a href={`noticeImageUpdate/${notices.noticeId}`}>
                            {" "}
                            Edit Image{" "}
                          </a>
                        </small>
                      ) : null}
                      <Card.Title>{notices.title}</Card.Title>
                      <Card.Text>{notices.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        <label name="posted">Posted By:</label>
                        {notices.name} at {notices.createdAt}
                        {localStorage.getItem("type") === "Admin" ? (
                          <a href={`noticeUpdate/${notices.noticeId}`}>
                            {" "}
                            Edit{" "}
                          </a>
                        ) : null}
                      </small>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
        <br />
      </>
    );
  }
}
export default Notice;
