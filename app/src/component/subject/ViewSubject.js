import React, { Component } from "react";
import Nav from "../NavBar/AdminNav";
import Subject from "./Subject";

class ViewSubject extends Component {
  render() {
    return (
      <>
        <Nav />
        <div className="container">
          <Subject />
          <br />
        </div>
      </>
    );
  }
}

export default ViewSubject;
