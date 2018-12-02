import React, { Component } from 'react';
import Routes from "./Config/Routes/";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(localStorage.getItem("user")) || null
    }
  }

  static getDerivedStateFromProps() {
    return { user: JSON.parse(localStorage.getItem("user")) }
  }

  render() {
    console.log(this.state.user)
    return (
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
