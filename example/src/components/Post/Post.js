import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import './styles.css';

class Post extends React.Component {

  render() {
    return (
      <Link
        className='post-link'
        to={`/post/${this.props.post.id}`}
      >
        <div
          className='post-image'
          style={{
            backgroundImage: `url(${this.props.post.imageUrl})`
          }}
        />
        <div className='post-description'>
          {this.props.post.description}
        </div>
      </Link>
    )
  }
  //<span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>

  // not currently used.
  handleDelete = async () => {
    await this.props.mutate({variables: {id: this.props.post.id}})
    this.props.history.replace('/')
  }
}

const deleteMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const PostWithMutation = graphql(deleteMutation)(Post)

export default PostWithMutation
