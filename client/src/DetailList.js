import React, { Component } from 'react';
import Image from 'react-bootstrap/lib/Image';
import BidHistory from './BidHistory';
import BidTimer from './BidTimer';

const io = require('socket.io-client');
const socket = io();

class DetailList extends Component {
  constructor(props) {
    super(props);
    this.state = {bidHistory:[],timeRemain:0} 
  } 

   // Fetch passwords after first mount
  componentDidMount() { 
    this.getBidHistory();
    var self = this; 
    socket.on('updateBid', function(msg){
      self.setState({bidHistory:msg});
      console.log("msg from client"+JSON.stringify(msg));
    }); 

    socket.emit('getTime', 'test');
    socket.on('remainingTime', function(timeFromServer){
      //self.props.serverTimeSync(timeFromServer);
      self.setState({timeRemain:timeFromServer});
      //self.setState({timeRemain:timeFromServer});
      console.log("time from client"+timeFromServer);
    });     
  }

  getBidHistory = () => {
    // Get the passwords and store them in state
    fetch('/api/bidhistory')
      .then(res => res.json())
      .then(bidHistory => this.setState({bidHistory}));
  }
  
   


  saveBid(bidhistory, liveStockID) {   
    console.log("bidhistory=="+JSON.stringify(bidhistory));
    this.state.bidHistory[liveStockID] = bidhistory;
    console.log(JSON.stringify(this.state.bidHistory));
    fetch('/api/bidhistory',{method:"POST",headers: new Headers({'content-type':'application/json'}), dataType:'json', body:JSON.stringify(this.state.bidHistory)})
     .then(res => res.json())
     .then(bidhistory => this.setState({bidhistory}));

  }

  // saveBid = (bidHistory) => {
  //   console.log(bidHistory);

  // }

  render() {
    var self = this;
  	var detailsNodes = this.props.data.map(function(details) {
      //map the data to individual details
       var bidSort;
       if(Object.keys(self.state.bidHistory).length !== 0) {
         self.bidHistoryObj = self.state.bidHistory[details.id];
         //var bidSort = Object.keys(self.bidHistoryObj).sort(function(a,b){return  self.bidHistoryObj[b]-self.bidHistoryObj[a]});
         var bidSort = Object.keys(self.bidHistoryObj)
                              .sort((a,b) =>self.bidHistoryObj[b]-self.bidHistoryObj[a])
                              .reduce((obj, key)=>({...obj, [key]: self.bidHistoryObj[key]}), {});
       }      
      return (
        <Details
          breed={details.breed}
          key = {details.id} 
          id ={details.id}
          basePrice={details.basePrice}
          image={details.image}
          bidHistory = {bidSort}  
          saveBid = {self.saveBid.bind(self)}
          userName = {self.props.userName}
          timeFromServer = {self.state.timeRemain}      

        >
         
        </Details>
      );
    });
    //print all the deatils in the list
    return (
      <div className = "detailsList">
       {this.state.bidHistory.length !== 0 &&
          <div className="row">
          
            {detailsNodes}
         
          </div>
         }
      </div>
    );
  }
}


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {bidPrice:'',inputValue:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(event) {    
    //this.setState({bidPrice: this.state.inputValue});  
    var bidHistoryObj = this.props.bidHistory;
    bidHistoryObj[this.props.userName] = this.state.inputValue;
    event.preventDefault();
    this.props.saveBid(bidHistoryObj,this.props.id);

  }

   render() { 
    //display an individual LiveStock Detail
    return (
      <div className="col-md-4">
        <div className="bid-detail-div">
          <div className="row">
            <div className="col-md-12">
              <Image src={"/static/assets/"+this.props.image} width="275" height="183" rounded />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 ">
              <div>
                <div className="livestock-info">
                  <h5>{this.props.breed} - {this.props.id}</h5>
                  <h5>Base Price - ${this.props.basePrice}</h5>
                   {this.props.timeFromServer > 0 &&
                     <BidTimer timeFromServer={this.props.timeFromServer}/>
                   }
                   {this.props.timeFromServer < 0 &&
                     <h5>SOLD</h5>
                   }
                </div>
                {this.props.userName !=='' && 
                  <div>
                    {this.props.timeFromServer >0 &&
                    <form className="form-inline" onSubmit={this.handleSubmit}> 
                      <div className="form-group mx-sm-3" >                  
                        <input id="inputBid" className="form-control" type="number" placeholder="Your Price" min={this.props.basePrice} value={this.state.inputValue} onChange={this.handleChange} />                  
                      </div>
                    <input type="submit" className="btn btn-primary" value="Bid" />
                    </form>
                    }
                  </div>
                }
              </div>
            </div>       
          </div>
          <div className = "row">
            <h4 className="bid-history-header ">Bid History</h4>
            <BidHistory bidHistory={this.props.bidHistory} ></BidHistory>
          </div>
        </div>
      </div>
    );

   }

}



export default DetailList;