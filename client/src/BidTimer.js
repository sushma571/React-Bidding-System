import React, { Component } from 'react';


class BidTimer extends Component {
	constructor(props) {
	    super(props);
	    this.timer = 0;
	    this.state = {timeLeft:{},seconds:0};
	}
    
    //start the timer after the first mount
	componentDidMount() { 
	  this.setState({seconds:this.props.timeFromServer});	 
	  this.startTimer();
	}

	secondsToTime(secs){
	    let hours = Math.floor(secs / (60 * 60));

	    let divisor_for_minutes = secs % (60 * 60);
	    let minutes = Math.floor(divisor_for_minutes / 60);

	    let divisor_for_seconds = divisor_for_minutes % 60;
	    let seconds = Math.ceil(divisor_for_seconds);

	    let obj = {
	      "h": hours,
	      "m": minutes,
	      "s": seconds
	    };
	    return obj;
	  }

	startTimer() {
	    if (this.timer === 0) {
	      this.timer = setInterval(this.countDown.bind(this), 1000);
	    }
	}

	countDown() {
	    // Remove one second, set state so a re-render happens.
	    let seconds = this.state.seconds - 1;
	    this.setState({
	      timeLeft: this.secondsToTime(seconds),
	      seconds: seconds,
	    });
	    
	    // Check if we're at zero.
	    if (seconds === 0) { 
	      clearInterval(this.timer);
	    }
	  }

	 render() {	 
	 	return (
	 	          <div className="clockdiv">
					  <div>
					    <span className="minutes">{this.state.timeLeft.m}</span>
					    <div className="smalltext">Min</div>
					  </div>
					  <div>
					    <span className="seconds">{this.state.timeLeft.s}</span>
					    <div className="smalltext">sec</div>
					  </div>
					</div>	 			
      			          		
	 		);
	 }
	

}

export default BidTimer;