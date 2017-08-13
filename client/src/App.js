import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Welcome from './Welcome';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // Initialize state
  state = {details:[],bidHistory:[]}

  // Fetch passwords after first mount
  componentDidMount() {
    this.getDetails();
    //this.getBidHistory();       
  }

  getDetails = () => {
    // Get the passwords and store them in state
    fetch('/api/details')
      .then(res => res.json())
      .then(details => this.setState({details}));
  }

  getBidHistory = () => {
    // Get the passwords and store them in state
    fetch('/api/bidhistory')
      .then(res => res.json())
      .then(bidHistory => this.setState({bidHistory}));
  }



  render() {
    return (
      <div className="App container-fluid">
        <div className = "row nav-bar">
          <div className = "col-md-12 app-title"><h1>BUYMYCOW</h1></div>
        </div>
        <div className = "row">          
            <Welcome details = {this.state.details} />          
        </div>
      </div>     
    );
  }
}

export default App;
