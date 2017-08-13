import React, { Component } from 'react';
import DetailList from './DetailList';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {username:'',value:''};
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({username: this.state.value});    
    event.preventDefault();
  }

  render() {
    const userName = this.state.username;   
    return (
      <div className="col-md-12">       
          <div className="row user-banner"> 
            {userName ==='' ? (
              <div className="col-md-12  label-center"> 
                 <h3>Please Enter Your Name To Bid</h3>       
                  <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group mx-sm-3" >                                       
                      <input id="inputUsername" placeholder="User Name" className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
                     
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                  </form>
                  
              </div>
              ):(
                <div className="col-md-12  label-center">
                  <h2>HI! {userName} Welcome to BUYMYCOW</h2>                  
                </div>
              )}
           
          </div>
         <div className="label-center">           
          </div>
      
         <div className="row">          
          <div className="col-md-12 product-detail-div"> 
            {/*<h3 className="label-center">LiveStock Available For Bidding</h3> */}
             {this.props.details.length !== 0 && 
             <DetailList data={this.props.details}  userName={userName} />
           }
          </div>
        </div>     
        
      </div>
    );
  }
}


export default Welcome;
