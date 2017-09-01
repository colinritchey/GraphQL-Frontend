import React from 'react';
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

import './styles.css'

class CreatePost extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      imageUrl: '',
      description: ''
    }
  }

  handlePost = async () => {
    const {description, imageUrl} = this.state
    await this.props.addPost({variables: {description, imageUrl}})

  }

  render(){
    let imageLink = this.state.imageUrl !== '' ? `${this.state.imageUrl}.jpg` :
      require('./placeholder.png');

    return (
      <div className='create-container'>
        <img
          src={imageLink}
        />

        <label value='Image'>Image Link:
          <input
            type='text'
            value={this.state.imageUrl}
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
        </label>


        <label>Description:
          <input
            type='text'
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            />
        </label>

        <a
          className='submit-button'
          onClick={this.handlePost}>Submit</a>

      </div>
    )
  }
}



const addMutation = gql`
  mutation addPost($description: String!, $imageUrl: String!) {
    createPost(description: $description, imageUrl: $imageUrl) {
      id
      description
      imageUrl
    }
  }
`

const PageWithMutation = graphql(addMutation, {name: 'addPost'})(CreatePost)

export default withRouter(PageWithMutation)
