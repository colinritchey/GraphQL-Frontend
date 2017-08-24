import React from 'react';
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

// import { Link } from 'react-router-dom'
import './styles.css'

class CreatePost extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      imageUrl: '',
      description: '',
      name: ''
    }
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

        <label>Name:
          <input
            type='text'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />
        </label>

        <label>Description:
          <input
            type='text'
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            />
        </label>

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

// export default CreatePost;
