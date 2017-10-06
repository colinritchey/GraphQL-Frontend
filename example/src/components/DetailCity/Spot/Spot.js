import React from 'react';
// import './styles.css';
import './spot.less';

class Spot extends React.Component {
  constructor(props){
    super(props);
    this.state = { spot: this.props.spot };
  }

  render() {
    if(this.props.spot){
      let prices = JSON.parse(this.props.spot.prices);
      return (
        <div className='spot-container'>
          <img
            className='spot-image'
            src={this.props.spot.image}
            />
          <div className='spot-name'>
            {this.props.spot.name}
          </div>
          <div>
            Rating: ...
          </div>
          <div>
            <h3>Pricing: </h3>
            <p>regular: {prices.regular}</p>
            <p>latte: ...</p>
            <p>mocha: ...</p>
          </div>
        </div>
      )
    } else  {
      return(
        <div className='spot-container'>
          <p>Select a location</p>
        </div>
      )
    }
  }
}

export default Spot;
