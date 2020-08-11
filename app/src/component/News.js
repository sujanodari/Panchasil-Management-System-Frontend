import React, { Component } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import NoImage from "./noimage.jpg";
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {},
    };
  }
  render() {
    const { news } = this.props;
    return (
      <>
        <div className="container">
          <p align="center">
            <b>No of news: {news.length}</b>
          </p>
          <hr />

          {news.length === 0 ? (
            <p>No news available</p>
          ) : (
            <div className="row">
              {news.map((news) => (
                <div className="col-md-4 fix-news">
                  <Card className="mycard">
                    {news.image == null ? (
                      <Card.Img
                        variant="top"
                        src={NoImage}
                        className="fix-image"
                      />
                    ) : (
                      <a href={`http://localhost:3012/images/${news.image}`}>
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3012/images/${news.image}`}
                          className="fix-image"
                          alt="image not found"
                        />
                      </a>
                    )}
                    <Card.Body>
                      {localStorage.getItem("type") === "Admin" ? (
                        <small>
                          <a href={`newsImageUpdate/${news.newsId}`}>
                            {" "}
                            Edit Image{" "}
                          </a>
                        </small>
                      ) : null}
                      <Card.Title>{news.title}</Card.Title>
                      <Card.Text>{news.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        <label name="posted">Posted By:</label>
                        {news.name} at {news.createdAt}
                        {localStorage.getItem("type") === "Admin" ? (
                          <a href={`newsUpdate/${news.newsId}`}> Edit </a>
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
export default News;
