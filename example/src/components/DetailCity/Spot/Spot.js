import React from 'react';

class Spot extends React.Component {

  render() {

    return (
      <div>
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
  }
}

export default Spot;
