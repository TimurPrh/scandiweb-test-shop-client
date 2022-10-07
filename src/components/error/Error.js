import React, { Component } from 'react';
import './error.scss'

class Error extends Component {
  render() {
    return (
      <div className="error">
        There is an error! <br /> Try again later
      </div>
    );
  }
}

export default Error;