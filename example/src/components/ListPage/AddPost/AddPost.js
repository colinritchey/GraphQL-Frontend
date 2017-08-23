import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css'

class AddPost extends React.Component {
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
        <div>New Post</div>
      </Link>
    )
  }
}

export default AddPost;
