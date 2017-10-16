import React from 'react'
import { Link } from 'react-router-dom'
import './styles.less';

class City extends React.Component {

  render() {

    return (
      <Link
        className='city-link-item'
        to={`/city/${this.props.city.id}`}
      >
        <img
          alt=''
          className='city-image'
          style={{
            backgroundImage: `url(${this.props.city.image})`
          }}
        />
        <div className='city-description'>
          {this.props.city.name}
        </div>
      </Link>
    )
  }
}

export default City
