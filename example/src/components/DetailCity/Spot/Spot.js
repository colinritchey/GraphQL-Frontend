import React from 'react';
import './styles.css';

class Spot extends React.Component {
  constructor(props){
    super(props);
    this.state = { spot: this.props.spot };
  }

  render() {

    if(this.props.spot){
      return (
        <div className='spot-container'>
          <img
            className='spot-image'
            style={{
              backgroundImage: `url(${this.props.spot.image})`
            }}
            />
          <div className='spot-name'>
            {this.props.spot.name}
          </div>
        </div>
      )
    } else  {
      return(
        <div className='spot-container'>
          none selected
        </div>
      )
    }
  }
}

export default Spot;
