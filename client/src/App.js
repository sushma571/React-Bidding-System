import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Welcome from './Welcome';
import './App.css';

class App extends Component {
  // Initialize state
  state = {details:[],bidHistory:[]}

  // Fetch liveStock Details after first mount
  componentDidMount() {
    this.getDetails();          
  }

  getDetails = () => {
    // Get the livestock Details and store them in state
    fetch('/api/details')
      .then(res => res.json())
      .then(details => this.setState({details}));
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
