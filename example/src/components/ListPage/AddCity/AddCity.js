import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css'

class AddCity extends React.Component {
  render(){
    return (
      <Link
        to='/create'
        className='link-container'
        >
        <img
          src={require('../../../assets/plus.svg')}
          alt=''
          className='plus mb3'
        />
      <div>New City</div>
      </Link>
    )
  }
}

export default AddCity;
