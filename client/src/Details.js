import React, { Component } from 'react';

class DetailList extends Component {
  constructor(props) {
    super(props);   
  } 

  render() {
  	var detailsNodes = this.props.data.map(function(details) {
      //map the data to individual details
      return (
        <Details
          contributor={details.contributor}
          key={details.id}
          amount={details.amount}
        >
          {details.comment}
        </Details>
      );
    });
    //print all the deatils in the list
    return (
      <div className="detailsList">
        {detailsNodes}
      </div>
    );
  }
}

var Details = React.createClass({
  render: function() {
    //display an individual donation
    return (
      <div className="donation">
        <h2 className="donationContributor">
          {this.props.contributor}: ${this.props.amount}
        </h2>
          {this.props.comment.toString()}
      </div>
    );
  }
});

export default DetailList;